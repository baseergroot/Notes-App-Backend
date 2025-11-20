// notes app
import cookieParser from 'cookie-parser';
import express, { json } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import connectDB from './lib/MongoDB.ts';
import User from './models/user.ts';
import { compare, hash } from 'bcryptjs';
import middleware from './lib/middleware.ts';
import AuthMiddleware from './lib/authRoutesMiddleware.ts';
import Notes from './models/notes.ts';
import cors from 'cors'

const app = express();

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({ origin: '*' }));

const jwtSecret = process.env.JWT_SECRET!
if (!jwtSecret) throw Error("JWT secret is undefined")

dotenv.config()
await connectDB()

app.get('/', middleware, (req, res) => {
    console.log("home route hit")
    res.json({
        message: `hello ${req.user?.username}`
    })
});

app.post('/api/signup', AuthMiddleware, async (req, res) => {
    console.log("signup api hit")
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }

    const userExist = await User.findOne({ username })

    if (userExist) {
        return res.status(400).json({ error: 'User already exists.' });
    }

    const hashedPassword = await hash(password, 10);

    await User.create({
        username,
        password: hashedPassword
    })

    const token = jwt.sign({ username }, jwtSecret, { expiresIn: '1h' });

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "lax"
    });

    res.json({ message: 'Logged in successfully' });

})

app.post('/api/login', AuthMiddleware,  async (req, res) => {
    console.log("login api hit")
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }

    const userExist = await User.findOne({ username }).select('+password')

    if (!userExist) {
        return res.status(400).json({ error: 'Username or password is incorrect' });
    }

    const isPasswordValid = await compare(password, userExist.password)

    console.log({isPasswordValid})

    if (!isPasswordValid) {
        return res.status(400).json({ error: 'Username or password is incorrect' });
    }

    const token = jwt.sign({ username }, jwtSecret, { expiresIn: '1h' });

    console.log({token})

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "lax"
    });

    res.json({ message: 'Logged in successfully' });

})

app.delete('/api/logout', middleware, (req, res) => {
    console.log("logout api hit")
    res.clearCookie('token')
    res.json({ message: 'Logged out successfully' });
})


app.post('/api/notes/create', middleware, async (req, res) => {
    console.log("create route hit")
    const { title, description } = req.body

    if (!title || !description) {
        console.log("title and description are required")
        res.json({
            success: false,
            error: "title and description are required"
        })
    }

    const user = req.user

    if (user) {

        console.log(user)

        const note = await Notes.create({
            title,
            description
        })

        console.log(note._id)

        const updatedUser = await User.findOneAndUpdate({ username: user.username }, {
            $push: {
                notes: note._id
            }
        }).select('-password -username')

        res.json({
            success: true,
            title,
            description,
            user: updatedUser
        })
    }
    res.json({
        success: false,
        error: "user not found"
    })

})

app.get('/api/notes', middleware, async (req, res) => {
    console.log("notes route hit")
    const user = req.user
    if (user) {

        const userData = await User.findOne({ username: user.username }).populate('notes', 'title description').select('-password')

        console.log(userData)
        userData ?
            res.json({
                success: true,
                user: userData
            }) : res.json({
                success: false,
                error: "Notes not found"
            })
    }
    res.json({
        success: false,
        error: "user not found"
    })
})

app.delete('/api/notes/delete/:id', middleware, async (req, res) => {
    console.log("delete route hit", req.params.id)
    const noteId = req.params.id
    const user = req.user
    console.log("user from middleware", user)

    await Notes.findByIdAndDelete(noteId)

    const updatedUser = await User.findOneAndUpdate({ username: user?.username }, {
        $pull: {
            notes: noteId
        }
    }, { new: true }).select('-password -username')

    res.json({user: updatedUser})
})

app.put('/api/notes/update/:id', middleware, async (req, res) => {
    console.log('update note hit')
    const {title, description} = req.body
    const noteId = req.params.id
    const user = req.user
    console.log("user from middleware", user)

    const updatedNotes = await Notes.findByIdAndUpdate(noteId, {
        $push: {
            title,
            description
        }
    }, {new: true})

    res.json({
        success: true,
        message: "Notes Updated Successfully",
        updatedNotes
    })
})

app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
});


// handle getUser logic
// delete notes from db and notes arry from user
// crud - create read delete done, 
// update testing

// todo
// write req types after adding user to req body