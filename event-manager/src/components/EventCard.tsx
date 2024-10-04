import { Box, Checkbox, Grid2, Typography } from "@mui/material"
import { blue } from "@mui/material/colors"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import EventAvailableIcon from "@mui/icons-material/EventAvailable"

interface EventCardProps {
  event: any
  subscriptions: any
  onClickSuscribeToEvent: any
}

function EventCard(props: EventCardProps) {
  const { event, subscriptions, onClickSuscribeToEvent } = props

  return (
    <Grid2 size={{ sm: 12, md: 6, lg: 4, xl: 3 }} alignContent={"stretch"}>
      <Box
        sx={{
          width: "20rem",
          height: "11rem",
          borderRadius: "16px",
          backgroundColor: blue[50],
          border: `1px solid ${blue[500]}`,
          padding: "1.5rem",
          textAlign: "start",
        }}
      >
        <Typography variant="h6">{event.name}</Typography>
        <Typography variant="body1">{event.description}</Typography>
        <Typography variant="body1">{event.location}</Typography>
        <Typography variant="body1">{event.date}</Typography>
        <Grid2 container justifyContent="flex-end" alignContent="center">
          <Grid2 alignSelf="center">
            {subscriptions?.[event.id] ? (
              <Typography variant="body2">Suscribed!</Typography>
            ) : (
              <Typography variant="body2">Suscribe to event</Typography>
            )}
          </Grid2>
          <Grid2>
            <Checkbox
              icon={<CalendarTodayIcon />}
              checkedIcon={<EventAvailableIcon />}
              checked={subscriptions?.[event.id] || false}
              onClick={() => onClickSuscribeToEvent(event.id)}
            />
          </Grid2>
        </Grid2>
      </Box>
    </Grid2>
  )
}

export default EventCard
