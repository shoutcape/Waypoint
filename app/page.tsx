'use client';
import { createAnswer } from '@/api';
import { useState, useEffect, FormEvent, useRef } from 'react';
import styles from './page.module.css'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LuWaypoints } from "react-icons/lu";

type Step = {
  StepName: string;
  Instructions: string[];
};

type Phase = {
  PhaseName: string;
  Duration: string;
  Steps: Step[];
};

type Roadmap = {
  Title: string;
  Introduction: string;
  Phases: Phase[];
};

const Home = () => {
  const [response, setResponse] = useState<Roadmap | null>(null);
  const [error, setError] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const definedGoal = inputRef.current?.value
    if (!definedGoal) {
      setError('Input is empty')
      return 
    }
    setError('')
    const result = await createAnswer(definedGoal);
    if (!result || !result.content) {
      return
    }
    console.table(result.content);
    try {
      const cleanedContent = result.content.replace(/```/g, '');
      const parsedContent: Roadmap = JSON.parse(cleanedContent);
      setResponse(parsedContent);
    } catch (error) {
      console.log('error', error)
      setError('Error: Try again')
    }
  }

  return (
    <div className={styles.appContainer}>
      <div>
        <form className={styles.inputForm} onSubmit={handleSubmit}>
          <Input type='text' ref={inputRef} className={styles.inputField} />
          <Button type='submit' className={styles.submitButton}>
            <LuWaypoints/>
          </Button>
        </form>
      </div>
      {response && !error ? (
        <div className={styles.responseContainer}>
          <h1 className={styles.responseTitle}>{response.Title}</h1>
          <h2 className={styles.responseIntroduction}>{response.Introduction}</h2>
          {response.Phases.map((phase: Phase, index: number) => (
            <div key={index} className={styles.phaseContainer}>
              <div className={styles.phaseTitle}>
                <p>{phase.PhaseName}</p>
                <p>({phase.Duration})</p>
              </div>
              {phase.Steps.map((step: any, stepIndex: number) => (
                <div key={stepIndex} className={styles.stepContainer}>
                  <h4 className={styles.stepTitle}>{step.Step}</h4>
                  <ul className={styles.instructionsList}>
                    {step.Instructions.map((instruction: string, instructionIndex: number) => (
                      <li key={instructionIndex} className={styles.instructionItem}>{instruction}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p className='text-center'>{error}</p>
      )}
    </div>
  );
};

export default Home;
