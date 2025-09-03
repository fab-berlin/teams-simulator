export interface TeamMessage {
  id?: string
  author: string
  timestamp: string
  timeLabel: string
  text: string
  skeleton: boolean
  _batchIndex: number
}

export type TeamMessages = TeamMessage[]
