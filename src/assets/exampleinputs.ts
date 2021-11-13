
// similarity model demo examples
// each example must have structure like
// {"sentence1": "...", "sentence2": "..."}
var simexamples = [
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

// paragraph rater model demo examples
// each example must have structure like
// {"paragraph": ...}
var paragraphexamples = [
    {
        "paragraph": "“It is simplicity itself,” said he; “my eyes tell me that on the inside of your left shoe, just where the firelight strikes it, the leather is scored by six almost parallel cuts. Obviously they have been caused by someone who has very carelessly scraped round the edges of the sole in order to remove crusted mud from it."
    },
    {
        "paragraph": "“My dear fellow,” said Sherlock Holmes as we sat on either side of the fire in his lodgings at Baker Street, “life is infinitely stranger than anything which the mind of man could invent. We would not dare to conceive the things which are really mere commonplaces of existence. If we could fly out of that window hand in hand, hover over this great city, gently remove the roofs, and peep in at the queer things which are going on, the strange coincidences, the plannings, the cross-purposes, the wonderful chains of events, working through generations, and leading to the most outré results, it would make all fiction with its conventionalities and foreseen conclusions most stale and unprofitable.”"
    },
    {
        "paragraph": "Just then her head struck against the roof of the hall: in fact she was now more than nine feet high, and she at once took up the little golden key and hurried off to the garden door."
    },
    {
        "paragraph": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
        "paragraph": "in principio creavit Deus caelum et terram"
    },
    {
        "paragraph": "rand trial rand ran random ran ran ran random rand random rand random gold ran ra"
    }
]

// dictionary of all examples, key is the route (look in projectsdata.json for route)
export var allexamples: {[key: string]: Array<any>} = {
                                                        "similarity": simexamples,
                                                        "paragraphrater": paragraphexamples
                                                        }