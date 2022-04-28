const { query } = require("express");
const knex = require("../conexao");

const listarProdutos = async (req, res) => {
  const { usuario } = req;
  const { categoria } = req.query;

  try {
    const produtos = await knex("produtos")
      .where({ usuario_id: usuario.id })
      .where((query) => {
        if (categoria) {
          return query.where("categoria", "ilike", `%${categoria}%`);
        }
      });

    return res.json(produtos);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const obterProduto = async (req, res) => {
  const { usuario } = req;
  const { id } = req.params;

  try {
    const produto = await knex("produtos")
      .where({
        id,
        usuario_id: usuario.id,
      })
      .first();

    if (!produto) {
      return res.status(404).json("Produto não encontrado");
    }

    return res.json(produto);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const cadastrarProduto = async (req, res) => {
  const { usuario } = req;
  const { nome, estoque, preco, categoria, descricao, imagem } = req.body;

  if (!nome) {
    return res.status(404).json("O campo nome é obrigatório");
  }

  if (!estoque) {
    return res.status(404).json("O campo estoque é obrigatório");
  }

  if (!preco) {
    return res.status(404).json("O campo preco é obrigatório");
  }

  if (!descricao) {
    return res.status(404).json("O campo descricao é obrigatório");
  }

  try {
    const produto = await knex("produtos").insert({
      usuario_id: usuario.id,
      nome,
      estoque,
      preco,
      categoria,
      descricao,
      imagem,
    });

    if (!produto) {
      return res.status(400).json("O produto não foi cadastrado");
    }

    return res.json("Produto cadastrado com sucesso");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const atualizarProduto = async (req, res) => {
  const { usuario } = req;
  const { id } = req.params;
  const { nome, estoque, preco, categoria, descricao, imagem } = req.body;

  if (!nome && !estoque && !preco && !categoria && !descricao && !imagem) {
    return res
      .status(404)
      .json("Informe ao menos um campo para atualizaçao do produto");
  }

  try {
    const produtoEcontrado = await knex("produtos")
      .where({
        id,
        usuario_id: usuario.id,
      })
      .first();

    if (!produtoEcontrado) {
      return res.status(404).json("Produto não encontrado");
    }

    const produto = await knex("produtos").where({ id }).update({
      usuario_id: usuario.id,
      nome,
      estoque,
      preco,
      categoria,
      descricao,
      imagem,
    });

    if (!produto) {
      return res.status(400).json("O produto não foi atualizado");
    }

    return res.json("Produto atualizado com sucesso");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const excluirProduto = async (req, res) => {
  const { usuario } = req;
  const { id } = req.params;

  try {
    const produtoEncontrado = await knex("produtos")
      .where({ id, usuario_id: usuario.id })
      .first();

    if (!produtoEncontrado) {
      return res.status(404).json("Produto não encontrado");
    }

    const produtoExcluido = await knex("produtos")
      .where({ id, usuario_id: usuario.id })
      .del();

    if (!produtoExcluido) {
      return res.status(400).json("O produto não foi excluido");
    }

    return res.json("Produto excluido com sucesso");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  listarProdutos,
  obterProduto,
  cadastrarProduto,
  atualizarProduto,
  excluirProduto,
};
