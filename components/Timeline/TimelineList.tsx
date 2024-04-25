import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  timelineItemClasses,
} from '@mui/lab'
import { Typography } from '@mui/material'
import { timelineData } from '@/utils/data/timelineConstants'
import './TimelineList.scss'

export const TimelineList = () => {
  return (
    <Timeline
      id='timeline'
      sx={{
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
      }}
    >
      {timelineData.map((item, index) => (
        <TimelineItem key={index}>
          <TimelineSeparator>
            <TimelineDot sx={{ background: '#1976D2' }} />
            {index !== timelineData.length && (
              <TimelineConnector sx={{ background: '#1976D2', width: '4px' }} />
            )}
          </TimelineSeparator>
          <TimelineContent id='tl-content-cont'>
            <Typography id='tl-title' variant='subtitle1' component='span'>
              {item.title}
            </Typography>
            <Typography id='tl-date' variant='subtitle2' color='text.secondary'>
              {item.date}
            </Typography>
            <Typography id='tl-body' variant='body2'>
              {item.description}
            </Typography>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  )
}
