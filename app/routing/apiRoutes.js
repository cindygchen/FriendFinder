var friends = require("../data/friends.js");

module.exports = function(app) {

	app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function(req, res) {
    	
    	var smallestDiff = 1000;
        var bestMatch;
    	var diffArray = [];

        var scoreInt = req.body['score[]'].map(function(num) {
            return parseInt(num);
        });

        for (var i = 0; i < friends.length; i++) {

            var matchScoreInt = friends[i]['score[]'].map(function(num) {
                return parseInt(num);
            });
            for (var j = 0; j < scoreInt.length; j++) {
                var diff = scoreInt[j] - matchScoreInt[j];
                if (diff < 0) {
                    diff = diff * -1;
                }
                diffArray.push(diff);
            }

            var totalDiff = diffArray.reduce(function(sum, value) {
                return sum + value;
            });
            if (totalDiff <= smallestDiff) {
                smallestDiff = totalDiff;
                bestMatch = friends[i];
            }
            diffArray = [];
        }
        res.json(bestMatch);
        friends.push(req.body);
    });
}
