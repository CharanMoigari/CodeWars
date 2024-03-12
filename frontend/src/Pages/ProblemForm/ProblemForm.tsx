import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import "./ProblemForm.css"
interface Testcase {
  input: string;
  output: string;
}

interface SampleTestcase extends Testcase {
  explanation: string;
}

const ProblemForm: React.FC = () => {
   const allTags = ['tag1', 'tag2', 'tag3', 'tag4', 'tag5','tag6','tag1', 'tag2', 'tag3', 'tag4', 'tag5','tag6']; 
   const [showAllTags, setShowAllTags] = useState(false);
  const maxTagsToShow = 6; // Maximum number of tags to show initially
  const tagsToShow = showAllTags ? allTags : allTags.slice(0, maxTagsToShow);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    difficulty: '',
    tags: [] as string[],
    inputFormat: '',
    outputFormat: '',
    sampleTestCases: [
    ] as SampleTestcase[],
    hiddenTestCases: [
    ] as Testcase[],
    newSampleInput: '',
    newSampleOutput: '',
    newSampleExplanation: '',
    newInputTestcase: '',
    newOutputTestcase: '',
  });
  const handleRemoveSampleTest = (index: number): void => {
    const updatedSampleTests = [...formData.sampleTestCases];
    updatedSampleTests.splice(index, 1);
    setFormData({ ...formData, sampleTestCases: updatedSampleTests });
  };
  const handleRemoveHiddenTestcase = (index: number): void => {
    const updatedInputTestcases = [...formData.hiddenTestCases];
    updatedInputTestcases.splice(index, 1);
    setFormData({ ...formData, hiddenTestCases: updatedInputTestcases });
  };
    

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value, type } = e.target;
  
    if (type === 'checkbox') {
      const isChecked = (e.target as HTMLInputElement).checked;
      const selectedTags = isChecked
        ? [...formData.tags, value]
        : formData.tags.filter(tag => tag !== value);
      setFormData({ ...formData, tags: selectedTags });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddSampleTest = (): void => {
    const { newSampleInput, newSampleOutput, newSampleExplanation } = formData;
    if (newSampleInput && newSampleOutput && newSampleExplanation) {
      const newTestcase: SampleTestcase = {
        input: newSampleInput,
        output: newSampleOutput,
        explanation: newSampleExplanation
      };
      setFormData({
        ...formData,
        sampleTestCases: [...formData.sampleTestCases, newTestcase],
        newSampleInput: '',
        newSampleOutput: '',
        newSampleExplanation: ''
      });
    }
  };

  const handleAddTestcase = (): void => {
    const { newInputTestcase,newOutputTestcase } = formData;
    if (newInputTestcase && newOutputTestcase) {
      const newTestcase: Testcase = {
        input: newInputTestcase,
        output: newOutputTestcase,
      };
      setFormData({
        ...formData,
        hiddenTestCases: [...formData.hiddenTestCases, newTestcase],
        newInputTestcase: '',
        newOutputTestcase: '',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
      if (formData.sampleTestCases.length === 0) {
    alert('Please add at least one sample test case.');
    return;
  }

  // Check if at least one hidden test case is present
  if (formData.hiddenTestCases.length === 0) {
    alert('Please add at least one hidden test case.');
    return;
  }
    try {
      const response = await axios.post('http://localhost:4000/api/admin/createProblem',{
formData
      })
      console.log('Problem submitted successfully');
    } catch (error) {
      console.error('Error submitting problem:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Create New Problem</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group ">
          <label htmlFor="title">Problem Title:</label>
          <input type="text" id="title" name="title" className="form-control" value={formData.title} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="description">Problem Description:</label>
          <textarea id="description" name="description" className="form-control" value={formData.description} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="difficulty">Difficulty Level:</label>
          <select id="difficulty" name="difficulty" className="form-control" value={formData.difficulty} onChange={handleChange} required>
            <option value="">Select Difficulty Level</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div className="form-group">
          <label>Tags:</label>
          <div className="tags-container">
            {tagsToShow.map((tag, index) => (
              <label className="tag-label" key={index}>
                <input
                  type="checkbox"
                  name="tags"
                  value={tag}
                  className="tag-checkbox"
                  onChange={handleChange}
                  checked={formData.tags.includes(tag)}
                />
                {tag}
              </label>
            ))}
          </div>
          { allTags.length > maxTagsToShow && (
            <button type="button" className="btn btn-link" onClick={() => setShowAllTags(!showAllTags)}>
             {showAllTags? 'View Less':'View more'}
            </button>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="inputFormat">Input Format:</label>
          <textarea id="inputFormat" name="inputFormat" className="form-control " value={formData.inputFormat} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="outputFormat">Output Format:</label>
          <textarea id="outputFormat" name="outputFormat" className="form-control" value={formData.outputFormat} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Sample Test Cases:</label>
          <div className="sample-io">
            <textarea name="newSampleInput" className="form-control sampleInput" value={formData.newSampleInput} onChange={handleChange} placeholder="Sample Input" />
            <textarea name="newSampleOutput" className="form-control sampleOutput" value={formData.newSampleOutput} onChange={handleChange} placeholder="Sample Output" />
            <textarea name="newSampleExplanation" className="form-control sampleExplaination" value={formData.newSampleExplanation} onChange={handleChange} placeholder="Explanation" />
            <button type="button" className="btn btn-primary mt-2 form-btn" onClick={handleAddSampleTest}>Add  Sample Testcase</button>
          </div>
          {formData.sampleTestCases.map((test, index) => (
            <div className="sample-box mt-3" key={index}>
              <div className="input-box">
                <label>Input:</label>
                <div>{test.input}</div>
              </div>
              <div className="output-box">
                <label>Output:</label>
                <div>{test.output}</div>
              </div>
              <div className="explanation-box">
                <label>Explanation:</label>
                <div>{test.explanation}</div>
              </div>
              <button
                type="button"
                className="btn btn-danger btn-sm remove-testcase"
                onClick={() => handleRemoveSampleTest(index)}
              >
                <FontAwesomeIcon icon={faTimes} /> Remove
              </button>
            </div>
          ))}
        </div>

        <div className="form-group">
          <label>Hidden Test Cases:</label>
          <div className="testcase">
            <textarea name="newInputTestcase" className="form-control " value={formData.newInputTestcase} onChange={handleChange} placeholder="Hidden Input" />
            <textarea name="newOutputTestcase" className="form-control" value={formData.newOutputTestcase} onChange={handleChange} placeholder="Hidden Output" />
            <button type="button" className="btn btn-primary mt-2 form-btn" onClick={handleAddTestcase}>Add Hidden Testcase</button>
          </div>
          {formData.hiddenTestCases.map((test, index) => (
            <div className="testcase-box mt-3" key={index}>
              <div className="input-box">
                <label>Input:</label>
                <div>{test.input}</div>
              </div>
              <div className="output-box">
                <label>Output:</label>
                <div>{test.output}</div>
              </div>
              <button
                type="button"
                className="btn btn-danger btn-sm remove-testcase"
                onClick={() => handleRemoveHiddenTestcase(index)}
              >
                <FontAwesomeIcon icon={faTimes} /> Remove
              </button>
            </div>
          ))}
        </div>

        <button type="submit" className="btn btn-primary form-btn">Add Problem</button>
      </form>
    </div>
  );
};

export default ProblemForm;
