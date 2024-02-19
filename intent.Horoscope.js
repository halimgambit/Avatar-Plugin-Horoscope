'use strict';

// Ce module vérifie si une règle du plugin matche avec un terme de la phrase

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helpers = require('../../node_modules/ava-ia/lib/helpers');

exports.default = function (state, actions) {
 
	// sort si une règle d'un autre plugin a déjà été vérifiée
	if (state.isIntent) return (0, _helpers.resolve)(state);
	
	// vérifie le tableau de règles du plugin
	var tokens = (0, _helpers.intersect)(Config.modules.Horoscope.rules, state.tokens);	
	
	if (tokens) { // vérifié !
		state.isIntent = true;
		if (state.debug) info('Intent Horoscope, Tokens:', tokens.toString());
		return (0, _helpers.factoryActions)(state, actions);
	} else  // non vérifié, plugin suivant...
		return (0, _helpers.resolve)(state);
	
};