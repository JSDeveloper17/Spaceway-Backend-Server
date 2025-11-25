const express = require('express')

const authRouter = express.Router()

authRouter.post("/auth")
authRouter.post("/auth/login")
authRouter.post("/auth/register")
