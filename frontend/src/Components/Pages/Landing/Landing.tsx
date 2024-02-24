import React, { useState } from "react";
import CodeEditorWindow from "../CodeEditor/CodeEditor";
import axios from 'axios';
const javascriptDefault = `print("Bujji Bangaram")`;

const Landing = () => {
    const [code, setCode] = useState(javascriptDefault);
    const [output, setOutput] = useState("");
    const [stdinInput, setStdinInput] = useState("");
    const [problem,setProblem]=useState("")

    // Function to handle form submission
    const onSubmit = async () => {
        try {

            // Send submission request to Judge0 API
            const options = {
                method: 'POST',
                url: 'https://judge0-ce.p.rapidapi.com/submissions',
                params: {
                    base64_encoded: 'true',
                    fields: '*'
                },
                headers: {
                    'content-type': 'application/json',
                    'Content-Type': 'application/json',
                    'X-RapidAPI-Key': '18957bc35dmsh90ff25c5527dcc3p1eaa48jsn88af27ec2234',
                    'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
                },
                data: {
                    language_id: 71,
                    source_code: btoa(code),
                    expected_output: btoa("12"),
                    stdin: btoa(stdinInput)
                }
            };

            const response = await axios.request(options);
            const token = response.data.token;
            checkStatus(token);
        } catch (error) {
            console.error(error);
            // Handle error (e.g., display error message to the user)
        }
    }

 useState(async()=>{
    try {
        let id='65d36435fc331cdf3b9ae641'
        const response = await axios.get(`http://localhost:4000/api/admin/problems/?id=${id}`,
        )
        console.log(response)
        if(response.status===200){
            setProblem(response.data.Data.sampleTestCases[0].input)
        }
        console.log('fetched problem sucessfully');
      } catch (error) {
        console.error('Error in get problem:', error);
      }
    });

    // Function to check submission status
    const checkStatus = async (token: string) => {
        try {
            const options = {
                method: 'GET',
                url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
                params: {
                    base64_encoded: 'true',
                    fields: '*'
                },
                headers: {
                    'X-RapidAPI-Key': '18957bc35dmsh90ff25c5527dcc3p1eaa48jsn88af27ec2234',
                    'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
                }
            };

            let response = await axios.request(options);
            let statusId = response.data.status?.id;

            // Processed - we have a result
            if (statusId === 1 || statusId === 2) {
                // still processing
                setTimeout(() => {
                    checkStatus(token);
                }, 2000);
            } else {
                // Submission completed, process the result
                console.log("response.data", response.data);
                const outputDetails = response.data;
                setOutput(atob(outputDetails.stdout));
            }
        } catch (err) {
            console.log("err", err);
            // Handle error (e.g., display error message to the user)
        }
    };

    // Function to handle code editor changes
    const onChange = (value: string | undefined) => {
        if (value !== undefined) {
            setCode(value);
        }
    };

    return (
        <div>
            <CodeEditorWindow
                code={code}
                onChange={onChange}
                language={'python'}
                theme={'vs-dark'}
            />
            <div className="output-window">
            <textarea
                    value={stdinInput}
                    onChange={(e) => setStdinInput(e.target.value)}
                    placeholder="Enter stdin input (one line per textarea)"
                    style={{ height: '200px', overflowY: 'auto' }} // Set a fixed height and allow vertical scrolling
                />
                {output}
                <textarea value={problem}/>
            </div>
            <button onClick={onSubmit}>SubmitCode</button>
        </div>
    );
}

export default Landing;
