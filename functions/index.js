const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);
const express = require("express");
const cors = require("cors")

const router = express();
router.use(cors({ origin: true }));

// buscar por id
router.get('/User/:id', async (req, res) => {
    const User = await
        admin.firestore().collection('Users').doc(req.params.id).get();
    res.send(User);
});

//listado de registros
router.get('/users', async (req, res) => {
    const users = await
        admin.firestore().collection('users').get();
    var lista = [];
    users.doc.forEach(doc => {
        lista.push({ id: doc.id, data: doc.data() })
    });
    res.send(lista);
});

// crear registro
router.post('/users', async (req, res) => {
    const user = await admin.firestore().collection('users').doc(req.params.id)
        .add(req.body);
    res.send(user)
})

// actualizar registro
router.put('/user/:id', async (req, res) => {
    const user = await admin.firestore().collection('users').doc(req.params.id)
        .update(req.body);
    res.send(user)
})

// eliminar registro
router.delete('/user/:id', async (req, res) => {
    const user = await admin.firestore().collection('users').doc(req.params.id)
        .delete(req.body);
    res.send(user)
})

exports.test = functions.https.onRequest(router);