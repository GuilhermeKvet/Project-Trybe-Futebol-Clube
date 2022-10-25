'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("matches", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      homeTeam: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'home_team',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'teams',
          key: 'id'
        }
      },
      homeTeamGoals: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'home_team_goals',
      },
      awayTeam: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'away_team',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'teams',
          key: 'id'
        }
      },
      awayTeamGoals: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'away_team_goals',
      },
      inProgress: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        field: 'in_progress',
      },
      // teamHome: {
      //   type: Sequelize.STRING,
      //   onUpdate: 'CASCADE',
      //   onDelete: 'CASCADE',
      //   allowNull: false,
      //   foreignKey: true,
      //   field: 'team_home',
      //   references: {
      //     model: 'teams',
      //     key: 'id'
      //   }
      // },
      // teamAway: {
      //   type: Sequelize.STRING,
      //   allowNull: false,
      //   foreignKey: true,
      //   field: 'team_away',
      //   references: {
      //     model: 'teams',
      //     key: 'teamName'
      //   }
      // }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("matches");
  }
};
