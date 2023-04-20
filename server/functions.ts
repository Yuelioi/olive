import type { Message } from '@/types/client'

export const event_preprocessor = (message: Message, ...args: any) => {
    // console.log(message)
    // console.log(args)
}

export const event_postprocessor = (message: Message) => {
    // console.log(message)
}
