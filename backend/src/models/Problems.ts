import mongoose from "mongoose";

const ProblemSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: false
    },
    description: {
        type: String,
        required: false,
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        required: false
    },
    tags: {
        type: [String],
        required: false
    },
    inputFormat: {
        type: String,
        required: false
    },
    outputFormat: {
        type: String,
        required: false
    },
    sampleTestCases: [
        {
            input: { type: String },
            output: { type: String },
            explanation: { type: String }
        }
    ],
    hiddenTestCases: [
        {
            input: { type: String },
            output: { type: String }
        }
    ],
});

export default mongoose.model("Problem", ProblemSchema);
