const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;

const configuration = {
    host: "localhost",
    dialect: "mysql"
};

const sequelize = new Sequelize("hastenote",
    "author", "gQ0WTGHCVWlJNCrpdAS8", configuration);

const dbExports = {sequelize};

function defineModel(name, columns) {
    Object.values(columns).forEach((column) => {
        if (column.allowNull === undefined) {
            column.allowNull = false;
        }
    });

    columns.id = {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    };

    return sequelize.define(name, columns, {
        timestamps: false
    });
}

dbExports.User = defineModel("User", {
    username: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING
    }
});

function addDefaultUserAssociation(model) {
    model.belongsTo(dbExports.User, {
        foreignKey: "userId",
        targetKey: "id"
    });
}

dbExports.Note = defineModel("Note", {
    userId: {
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING
    },
    color: {
        type: DataTypes.STRING(6),
        defaultValue: "FFFFFF"
    },
    contents: {
        type: DataTypes.TEXT,
        defaultValue: ""
    },
});

addDefaultUserAssociation(dbExports.Note);

module.exports = dbExports;
