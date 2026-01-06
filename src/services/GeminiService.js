import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY } from "@env";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const GeminiService = async ({ totalSpent, wishlist, interests }) => {
  try {
    const prompt = `
      You are a friendly financial advisor for a user in India. Their goal is to understand the impact of their spending.
      User's Total Spending: ₹${totalSpent}.
      User's Wishlist: ${JSON.stringify(wishlist)}.
      User's Interests: ${interests?.join(", ")}.

      Your tasks are:
      1. From the user's wishlist, identify all items they could have afforded with their total spending.
      2. Based on their interests in "${interests?.join(", ")}", suggest 3 tangible, exciting, and specific products or experiences available for purchase in India. Be creative. For example, if they like 'Gaming', suggest a 'Logitech G502 Gaming Mouse' instead of just 'Gaming Mouse'. Include a realistic estimated price in INR for each.
      3. Create a short, witty, and slightly cheeky summary (1-2 sentences) about their spending choice vs. their wishlist. For example: "While the month was full of expenses, that dream item on the wishlist is still waiting!"

      IMPORTANT: You must return the response ONLY in the following strict JSON format. Do not add any text before or after the JSON object. Do not use markdown like \`\`\`json.

      {
        "affordableWishlist": ["Item Name 1", "Item Name 2"],
        "suggestions": [
          { "name": "Specific Product Name 1", "estimatedPrice": "₹XXXX" },
          { "name": "Specific Experience Name 2", "estimatedPrice": "₹YYYY" },
          { "name": "Specific Product Name 3", "estimatedPrice": "₹ZZZZ" }
        ],
        "summary": "Your witty and fun summary here."
      }
    `;

    const model = genAI.getGenerativeModel({model: "gemini-2.5-flash" });

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    return JSON.parse(cleanedText);

  } catch (error) {
    console.error("Gemini Service Error:", error);
    return {
      affordableWishlist: [],
      suggestions: [],
      summary: "There was a little hiccup getting your AI insights."
    };
  }
};

export default GeminiService;