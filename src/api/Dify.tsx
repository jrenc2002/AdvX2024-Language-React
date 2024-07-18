import React, { useState, useEffect } from 'react'

type StreamingData = {
  event: string
  task_id: string
  workflow_run_id: string
  data: any
}

const DifyStreamingComponent: React.FC = () => {
  const [streamData, setStreamData] = useState<StreamingData[]>([])
  const [loading, setLoading] = useState(true)
  const [knownLanguage, setKnownLanguage] = useState('Chinese')
  const [learningLanguage, setLearningLanguage] = useState('English')
  const [userInput, setUserInput] = useState('I want to learn a new language.')
  const API_KEY = 'app-18TUI1c2UnLOndPihZjnLqLL' // Replace with your actual API key
  const USER_ID = 'abc-123' // Replace with your user ID
  const user_intended_content = '我希望能够掌握更多的语言技能' // Replace with your user intended content

  useEffect(() => {
    if (!knownLanguage || !learningLanguage || !userInput) {
      return
    }

    const startStreaming = async () => {
      const response = await fetch('https://api.dify.ai/v1/workflows/run', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: {
            known_language: knownLanguage,
            learning_language: learningLanguage,
            user_input: userInput,
            user_intended_content: user_intended_content
          },
          response_mode: 'streaming',
          user: USER_ID
        })
      })

      if (!response.ok) {
        console.error('Failed to start workflow')
        setLoading(false)
        return
      }

      const data = await response.json()
      const { workflow_run_id, task_id } = data

      const eventSource = new EventSource(
        `https://api.dify.ai/v1/workflows/run?workflow_run_id=${workflow_run_id}&task_id=${task_id}`
      )

      eventSource.onmessage = (event: MessageEvent) => {
        const parsedData: StreamingData = JSON.parse(event.data)
        setStreamData((prevData) => [...prevData, parsedData])
      }

      eventSource.onerror = () => {
        console.error('Error in EventSource')
        eventSource.close()
        setLoading(false)
      }

      eventSource.onopen = () => {
        setLoading(false)
      }

      return () => {
        eventSource.close()
      }
    }

    startStreaming()
  }, [knownLanguage, learningLanguage, userInput])

  return (
    <div>
      <input
        type="text"
        value={knownLanguage}
        onChange={(e) => setKnownLanguage(e.target.value)}
        placeholder="Enter known language"
      />
      <input
        type="text"
        value={learningLanguage}
        onChange={(e) => setLearningLanguage(e.target.value)}
        placeholder="Enter learning language"
      />
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Enter your input"
      />
      {loading && <p>Loading...</p>}
      <div>
        {streamData.map((data, index) => (
          <div key={index}>
            <p>{data.event}</p>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DifyStreamingComponent
