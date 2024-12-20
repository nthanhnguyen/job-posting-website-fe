// const {
//     GoogleGenerativeAI,
//     HarmCategory,
//     HarmBlockThreshold,
//   } = require("@google/generative-ai");

import { GoogleGenerativeAI, Part  } from "@google/generative-ai";

  
  const apiKey = import.meta.env.VITE_GOOGLE_AI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
  
   export const AIChatSession = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
      ],
    });

    export const AIChatSessionForExperience = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            { text: "You are an expert resume writer with experience in summarizing work experience into bullet points." },  // Cập nhật với thuộc tính `text`
          ],
        },
        {
          role: "model",
          parts: [
            { text: "Understood. I will help you summarize your work experience into bullet points suitable for your desired position." },  // Cập nhật với thuộc tính `text`
          ],
        },
        {
          role: "user",
          parts: [
            { text: `I want you to create a list of 5-7 bullet points for my resume experience based on the following position title: Full stack developer. Please provide the result in HTML tags. Avoid adding any level of experience like 'Junior', 'Senior', 'Lead' or anything like that. Do not include JSON` },  // Cập nhật với thuộc tính `text`
          ],
        },
        {
          role: "model",
          parts: [
            { text: `<ul>
                  <li>Developed and maintained RESTful APIs using Node.js and Express.</li>
                  <li>Designed and implemented database schemas using PostgreSQL.</li>
                  <li>Implemented authentication and authorization mechanisms using JWT.</li>
                  <li>Optimized database queries for better performance.</li>
                  <li>Wrote unit and integration tests using Jest.</li>
                  <li>Deployed applications using Docker and Kubernetes.</li>
                  <li>Collaborated with front-end developers to integrate APIs.</li>
              </ul>` 
            },
          ],
        },
      ],
    });
    
  
  
  