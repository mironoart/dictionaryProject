import request from 'request-promise'
import options from './options'

const translate = async (from, to, text, endpoint, translation) => {
	const opt = await options(from, to, text, endpoint, translation)

	return request(opt).then(function(response) {
		/* return JSON.stringify(response, null, 4) */
		return response[0]
	})
}

export default translate

//  dictionary/examples   body: [      { "Text": "fly", "Translation": "volar" }     ]
/* [
    {
        "normalizedSource": "fly",
        "normalizedTarget": "volar",
        "examples": [
            {
                "sourcePrefix": "I mean, for a guy who could ",
                "sourceTerm": "fly",
                "sourceSuffix": ".",
                "targetPrefix": "Quiero decir, para un tipo que podía ",
                "targetTerm": "volar",
                "targetSuffix": "."
            },
            {
                "sourcePrefix": "Now it's time to make you ",
                "sourceTerm": "fly",
                "sourceSuffix": ".",
                "targetPrefix": "Ahora es hora de que te haga ",
                "targetTerm": "volar",
                "targetSuffix": "."
            }
        ]
    }
] */

// dictionary/lookup
/* [
    {
        "normalizedSource": "fly",
        "displaySource": "fly",
        "translations": [
            {
                "normalizedTarget": "volar",
                "displayTarget": "volar",
                "posTag": "VERB",
                "confidence": 0.4081,
                "prefixWord": "",
                "backTranslations": [
                    {
                        "normalizedText": "fly",
                        "displayText": "fly",
                        "numExamples": 15,
                        "frequencyCount": 4637
                    },
                    {
                        "normalizedText": "flying",
                        "displayText": "flying",
                        "numExamples": 15,
                        "frequencyCount": 1365
                    },
                    {
                        "normalizedText": "blow",
                        "displayText": "blow",
                        "numExamples": 15,
                        "frequencyCount": 503
                    },
                    {
                        "normalizedText": "flight",
                        "displayText": "flight",
                        "numExamples": 15,
                        "frequencyCount": 135
                    }
                ]
            },
            {
                "normalizedTarget": "mosca",
                "displayTarget": "mosca",
                "posTag": "NOUN",
                "confidence": 0.2668,
                "prefixWord": "",
                "backTranslations": [
                    {
                        "normalizedText": "fly",
                        "displayText": "fly",
                        "numExamples": 15,
                        "frequencyCount": 1697
                    }

                ]
            }
        ]
    }
] */

// translate

/* [
    {
        "translations": [
            {
                "text": "Volar",
                "to": "es"
            }
        ]
    }
] */
