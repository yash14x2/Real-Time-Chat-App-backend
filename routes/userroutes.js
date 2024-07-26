import express from 'express';
import  {register ,login , setavatar , getallusers }  from '../controllers/usercontroller.js';

import { sendmessage , getallmessage } from '../controllers/Messagecontroller.js';
const router = express.Router();
router.post("/register" , register )
router.post("/login" , login )
router.post("/setavatar/:id" , setavatar)
router.get("/getallusers/:id" , getallusers)
router.post("/sendmessage" , sendmessage)
router.post("/getallmessages" , getallmessage)


export default router