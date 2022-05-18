const knex = require("../conexao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const senhaHash = require("../senhaHash");
const nodemailer = require("../nodemailer");

const login = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(404).json("É obrigatório email e senha");
  }

  try {
    const usuario = await knex("usuarios").where({ email }).first();

    if (!usuario) {
      return res.status(404).json("Usuário não encontrado");
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(404).json("Email ou Senha incorretos");
    }

    const token = jwt.sign({ id: usuario.id }, senhaHash, { expiresIn: "8h" });

    const { senha: _, ...dadosUsuario } = usuario;

    //! envio do email de boas vindas:

    const dadosEnvio = {
      from: `Market cubos <no-reply@fakemail.com>`,
      to: email,
      subject: "login na plataforma Market Cubos",
      text: `O ${email} realizou um Login na plataforme Market Cubos, caso não tenha sido você altere sua senha.`,
    };
    await nodemailer.sendMail(dadosEnvio);

    return res.json({ usuario: dadosUsuario, token });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  login,
};
