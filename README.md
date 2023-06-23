# Features futuras :

* Tabela de departamento;
* 

# Scripts

Para popular o banco de dados com a tabela do CAPES, basta executar o código

```
$ npx ts-node populate_areas.ts
```

Antes disso, você deve estar dentro do diretório `script`, então:

```
$ cd script
$ npx ts-node populate_areas.ts
```

O `ts-node` está instalado como uma biblioteca dev então `yarn` deve ser o suficiente pra instalar ele.

Também pode ser necessário rodar algumas migrações antes.