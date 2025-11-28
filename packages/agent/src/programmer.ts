import type { BaseAgentOptions } from './types'
import { generateText, message } from 'xsai'
import { programmer } from './prompts'
import { parseRootDocumentInfo } from '@dsl/x'

const parse = (content: string) => {
  const doc = content
    .match(/```document[\s\S]*?```/gm)?.[0] ?? ''
  console.log(doc)
  
  return doc
    .replace(/```document/, '')
    .replace('```', '')
    .trim()
}

export interface ProgrammerAgentOptions extends BaseAgentOptions {
  // Additional options specific to programmer agent
}

export type ProgrammerAgentInput = {
  content: string
  refs?: Record<string, string>
}

export const createProgrammerAgent = (options: ProgrammerAgentOptions) => {
  if (options.messages.length === 0 || options.messages[0].role !== 'system') {
    options.messages.unshift(
      message.system(programmer.system())
    )
  }

  type Result = {
    content: string
    refs: Record<string, string>
  }
  return async (
    input: ProgrammerAgentInput
  ): Promise<Result> => {
    options.messages.push(message.user(
      programmer.user(input)
    ))
    const { text, messages } = await generateText({
      model: options.model,
      apiKey: options.apiKey,
      baseURL: options.baseURL,
      messages: options.messages
    })
    options.messages.length = 0
    options.messages.push(...messages)
    const content = parse(text ?? '')
    const { refs } = parseRootDocumentInfo(content)
    return {
      content,
      refs,
    }
  }
}
