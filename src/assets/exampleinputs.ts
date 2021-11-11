
// similarity model demo examples
// each example must have structure like
// {"sentence1": "...", "sentence2": "..."}
export var simexamples = [
    {
        "sentence1": "It was the best of times and it was the worse of times",
        "sentence2": "It was a good time for some and a bad time for others"
    },
    {
        "sentence1": "I stuck my fork through the jelly",
        "sentence2": "The food on the plate has holes in it"
    },
    {
        "sentence1": "It is a bright and sunny day",
        "sentence2": "The weather outside is unpleasant"
    },
    {
        "sentence1": "The dowager queen is the title held by the widow of a deceased king",
        "sentence2": "Dowager queens have dead husbands"
    },
    {
        "sentence1": "There were three boys playing football with a round ball",
        "sentence2": "There was a goal to score on nearby"
    },
    {
        "sentence1": "There were three boys playing football with a round ball",
        "sentence2": "There was not a goal to score on nearby"
    },
    {
        "sentence1": "Grass contains a pigment that gives it its distinct color",
        "sentence2": "Grass is red, not green"
    },
    {
        "sentence1": "To be or not to be, that is the question",
        "sentence2": "To be is an answer to that question"
    },
    {
        "sentence1": "Progress is often measured by amount of energy a civilization consumes",
        "sentence2": "The more energy is needed, the more advanced the society"
    }];

// dictionary of all examples, key is the route (look in projectsdata.json for route)
export var allexamples: {[key: string]: Array<any>} = {"similarity": simexamples}