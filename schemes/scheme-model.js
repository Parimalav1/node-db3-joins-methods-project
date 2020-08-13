// get a list of schemes
// CRUD schemes
const schemesDb = require("../db-config.js");
const stepsDb = require('../db-config.js');
// above the fold
module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove,
    addStep
};

// implementation
function find() {
    return schemesDb("schemes");
};

function findById(id) {
    return schemesDb('schemes').where({ id }).first();
};

// select sc.scheme_name, s.id, s.step_number, s.instructions
// from steps as s
// join scheme as sc
// where s.scheme_id = sc.id;

function addSchemeName2Step(step, scheme_name) {
    return {
        ...step,
        scheme_name
    }
}

function findSteps(id) {
    console.log(id);
    return findById(id)
        .then(scheme => {
            if (scheme) {
                return stepsDb('steps').where({scheme_id: id})
                .then(steps => {
                    return steps.map(x => addSchemeName2Step(x, scheme.scheme_name))
                    // {
                    //     return {
                    //         ...x,
                    //         scheme_name: scheme.scheme_name
                    //     }
                    // })
                })
            } else {
                return null;
            }
        })

};

function add(scheme) {
    return (
        schemesDb('schemes')
            .insert(scheme)
            .returning("id")
            .then(ids => {
                const id = ids[0];

                return findById(id);
            })
    );
};

function addStep(step, scheme_id) {
    let newStep = { ...step, scheme_id };
    return (
        stepsDb('steps')
            .insert(newStep)
            .returning('id')
            .then(stepIds => {
                const id = stepIds[0]
                return (id);
            })
    )
};

function update(id, changes) {
    return schemesDb("schemes")
        .where({ id })
        .update(changes)
        .then((count) => {
            return findById(id);
        });
};

function remove(id) {
    return schemesDb("schemes").where({ id }).del();
};
