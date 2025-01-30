import Together from 'together-ai';

const together = new Together({
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
});

export const createAnswer = async (definedGoal: string) => {
  try {
    const response = await together.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: `
Generate a structured roadmap for ${definedGoal}. Use the following format:

          {
            "Title": "[Main Title]",
            "Introduction": "[Brief introduction]",
            "Phases": [
              {
                "PhaseName": "Phase(correct language) X(number): [Phase Name]",
                "Duration": "[Phase Duration]",
                "Steps": [
                  {
                    "Step": "Step X(number)(correct language, must be different than phase): [Step Name]",
                    "Instructions": [
                      "[Instruction 1]",
                      "[Instruction 2]"
                    ]
                  }
                ]
              }
            ]
          }

Each phase should include a name, duration, and multiple steps with descriptions. Return the response as JSON format string, ensure consistency, and that the result does not contain the JSON tag and is only formatted as {}, if you don't know how to create the roadmap for the defined goal, you can return an answer of "null". Support multiple languages based on the language defined in the goal.
`,
        },
      ],
      model: 'meta-llama/Llama-3.3-70B-Instruct-Turbo',
    });
    return response.choices[0].message;
  } catch (error) {
    console.error('Error fetching data:', error);
    return;
  }
};
