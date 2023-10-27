const Mysql = require('mysql2')
module.exports = async (app, con) => {
  try {

    await con.query(
      `CREATE TABLE IF NOT EXISTS endereco (
        id VARCHAR(50) primary key ,
        pais varchar(55) default 'Angola',
        provincia varchar(30),
        municipio varchar(30),
        bairro varchar(30),
        rua varchar(30),
        numeroCasa varchar(5)
      )`
    )
    console.log('table [endereco] criada com sucesso.')
    await con.query(
      `CREATE TABLE IF NOT EXISTS cliente (
        id bigserial primary key ,
        nome varchar(45) NOT NULL,
        email varchar(100) UNIQUE,
        telefone INT,
        enderecoID VARCHAR(50) NOT NULL,
        constraint fk_endereco foreign key (enderecoID) references endereco(id)
      )`
    )
    console.log('table [cliente] criada com sucesso.')
    await con.query(
      `CREATE TABLE IF NOT EXISTS encomenda (
        id bigserial primary key ,
        data DATE default CURRENT_TIMESTAMP,
        clienteID bigserial  NOT NULL,
        estatus int default 0,
        constraint fk_cliente foreign key (clienteID) references cliente(id)
      )`
    )
    console.log('table [encomenda] criada com sucesso.')

    await con.query(
      `CREATE TABLE IF NOT EXISTS produto (
        id VARCHAR(50) primary key,
        nome varchar(45) not null UNIQUE,
        preco float default 0,
        quantidade INT default 0
      )`
    )
    console.log('table [produto] criada com sucesso.')

    await con.query(
      `CREATE TABLE IF NOT EXISTS itemencomendado (
        id VARCHAR(50) primary key ,
        produtoID VARCHAR(50) NOT NULL,
        encomendaID bigserial NOT NULL,
        quantidade INT default 0,
        constraint fk_produto foreign key (produtoID) references produto(id),
        constraint fk_encomenda foreign key (encomendaID) references encomenda(id)
      )`
    )
    console.log('table [itemencomendado] criada com sucesso.')


    await con.query(`
      DO $$ 
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'nome_metodos') THEN
          CREATE TYPE nome_metodos AS ENUM ('PayPal', 'Transferência', 'Cartão_de_credito');
        END IF; 
      END $$;
    `)

    await con.query(
      `CREATE TABLE IF NOT EXISTS metodopagamento (
        id bigserial primary key ,
        nome nome_metodos default 'Transferência',
        token varchar(255),
        alternativo bigserial NOT NULL
      )`
    )

    await con.query(`
    DO $$ 
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'nome_metodos') THEN
        ALTER TABLE metodopagamento
        ADD CONSTRAINT fk_mpagamento
        FOREIGN KEY (alternativo)
        REFERENCES metodopagamento(id);
      END IF; 
    END $$;
  `)
    console.log('table [metodopagamento] criada com sucesso.')

    await con.query(
      `CREATE TABLE IF NOT EXISTS empregado (
        id bigserial primary key ,
        nome varchar(45) not null,
        datanascimento date,
        NIF varchar(45),
        NSS varchar(45),
        tipo int default 0,
        CHECK (datanascimento <= CURRENT_DATE - INTERVAL '15 years')
      )`
    )
    console.log('table [empregado] criada com sucesso.')

    await con.query(
      `CREATE TABLE IF NOT EXISTS fornecedor (
        id VARCHAR(50) primary key ,
        nome varchar(45) not null,
        enderecoID VARCHAR(50) not null,
        NIF varchar(45),
        constraint fk_endereco foreign key (enderecoID) references endereco(id)
      )`
    )

    console.log('table [fornecedor] criada com sucesso.')

    await con.query(
      `CREATE TABLE IF NOT EXISTS armazen (
        id bigserial primary key ,
        nome varchar(45) not null UNIQUE,
        capacidadeArmazenamento int,
        enderecoID VARCHAR(50) not null,
        constraint fk_endereco foreign key (enderecoID) references endereco(id)
      )`
    )
    console.log('table [armazen] criada com sucesso.')

    await con.query(
      `CREATE TABLE IF NOT EXISTS contrato (
        id bigserial primary key ,
        descricao text,
        data date default CURRENT_DATE,
        fornecedorID VARCHAR(50) not null,
        produtoID VARCHAR(50) not null,
        armazenID bigserial not null,
        constraint fk_fornecedor foreign key (fornecedorID) references fornecedor(id),
        constraint fk_produto foreign key (produtoID) references produto(id),
        constraint fk_armazen foreign key (armazenID) references armazen(id)
        
      )`
    )
    
    // await con.query(`alter table contrato add constraint 
    //   fk_fornecedor foreign key (fornecedorID)  references fornecedor(id)`);

    // await con.query(`alter table contrato add constraint 
    //   fk_produto foreign key (produtoID)  references produto(id)`);

    // await con.query(`alter table contrato add constraint 
    //   fk_armazen foreign key (armazenID)  references armazen(id)`);
    // await con.query(`
    // alter table contrato add constraint 
    //   fk_fornecedor foreign key (fornecedorID)  references fornecedor(id)
    // alter table fornecedor add constraint 
    //   foreign key (contratoID)  contrato(id)`);

    // 
    console.log('table [contrato] criada com sucesso.')

    await con.query(
      `CREATE TABLE IF NOT EXISTS departamento (
        id bigserial primary key ,
        nome varchar(45) not null,
        gerente int,
        enderecoID VARCHAR(50),
        constraint fk_gerente foreign key (gerente) references empregado(id),
        constraint fk_endereco foreign key (enderecoID) references endereco(id)
      )`
    )
    console.log('table [departamento] criada com sucesso.')

    await con.query(
      `CREATE TABLE IF NOT EXISTS pagamento (
        id bigserial primary key ,
        metodopagamentoID bigserial not null,
        data date default CURRENT_TIMESTAMP,
        clienteID bigserial not null,
        constraint fk_cliente foreign key (clienteID) references cliente(id),
        constraint fk_pagamento foreign key (metodopagamentoID) references pagamento(id)

      )`
    )
    console.log('table [pagamento] criada com sucesso.')

  } catch (err) {
    console.log("Erro ao criar as tabelas " + err.message)
  }
}