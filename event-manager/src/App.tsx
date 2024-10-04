import { Fragment, useState, useEffect } from "react"
import {
  Grid2,
  Button,
  Typography,
  Box,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  FormLabel,
  TextField,
  IconButton,
  Divider,
} from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import "./App.css"
import { blue } from "@mui/material/colors"
import CloseIcon from "@mui/icons-material/Close"
import EventCard from "./components/EventCard"

function App() {
  const [openDialog, setOpenDialog] = useState(false)
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    location: "",
    date: null,
  })
  const [events, setEvents] = useState([
    {
      id: "",
      name: "",
      description: "",
      location: "",
      date: "",
      categoryId: "",
    },
  ])
  const [categories, setCategories] = useState([{ id: null, name: "" }])
  const [subscriptions, setSubscriptions] = useState<{
    [key: number]: boolean
  }>({})
  const [isAbled, setIsAbled] = useState(false)

  useEffect(() => {
    fetch("http://localhost:8081/events")
      .then(res => {
        return res.json()
      })
      .then(data => {
        if (data[0]?.categoryId !== "") {
          setEvents(data)
        }
      })
  }, [])

  useEffect(() => {
    fetch("http://localhost:8081/categories")
      .then(res => {
        return res.json()
      })
      .then(data => {
        if (data[0]?.id !== "") {
          setCategories(data)
        }
      })
  }, [])

  useEffect(() => {
    if (events[0].id !== "") {
      getUpcomingEvents(events)
    }
  }, [events])

  useEffect(() => {
    validateButton()
    debugger
  }, [form])

  const onClickSuscribeToEvent = (eventId: any) => {
    setSubscriptions(previousSubs => ({
      ...previousSubs,
      [eventId]: !previousSubs[eventId],
    }))
  }

  const getUpcomingEvents = (events: any) => {
    if (events[0].id !== "") {
      return events
        .filter((e: any) => new Date(e.date) >= new Date())
        .sort(
          (a: any, b: any) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        )
        .slice(0, 5)
    }
  }

  const upcomingEvents = getUpcomingEvents(events)

  const onClickCreateEvent = () => {
    setOpenDialog(true)
  }

  const handleChangeInputName = (e: any) => {
    let input = e.target.value
    const regex = /^[A-Za-z]+$/
    if (input === "" || regex.test(input)) setForm({ ...form, name: input })
  }
  const handleChangeInputDescription = (e: any) => {
    let input = e.target.value
    setForm({ ...form, description: input })
  }
  const handleChangeInputCategory = (e: any) => {
    let input = e.target.value
    const regex = /^[A-Za-z]+$/
    if (input === "" || regex.test(input)) setForm({ ...form, category: input })
  }
  const handleChangeInputLocation = (e: any) => {
    let input = e.target.value
    setForm({ ...form, location: input })
  }
  const handleChangeInputDate = (e: any) => {
    let input = e.target.value
    setForm({ ...form, date: input })
  }

  const onClickCloseDialog = () => {
    setOpenDialog(false)
    setForm({
      ...form,
      name: "",
      description: "",
      category: "",
      location: "",
      date: null,
    })
    setIsAbled(false)
  }

  const validateButton = () => {
    if (
      form.category !== "" &&
      form.date !== "" &&
      form.description !== "" &&
      form.location !== "" &&
      form.name !== ""
    ) {
      setIsAbled(true)
    }
    debugger
  }
  return (
    <Fragment>
      <Grid2 container direction="column">
        <Grid2 container justifyContent={"flex-end"}>
          <Button
            variant="text"
            sx={{ backgroundColor: blue[800], color: "white" }}
            onClick={onClickCreateEvent}
          >
            + Create event
          </Button>
        </Grid2>
        <Grid2 container direction="column" justifySelf="flex-start">
          <Grid2 marginBottom="1.5rem">
            <Typography variant="h4" textAlign="start">
              Upcoming 5 events
            </Typography>
          </Grid2>

          <Grid2 container spacing={4} mb="3rem">
            {upcomingEvents?.map((event: any) => (
              <Grid2 key={event.id}>
                <EventCard
                  event={event}
                  onClickSuscribeToEvent={onClickSuscribeToEvent}
                  subscriptions={subscriptions}
                />
              </Grid2>
            ))}
          </Grid2>
          <Divider />
          {categories?.map(category => (
            <Grid2
              container
              direction="column"
              mb="3rem"
              mt="1.5rem"
              key={category.id}
            >
              <Grid2 mb="1.5rem">
                <Typography variant="h4" textAlign="start">
                  {category.name}
                </Typography>
              </Grid2>
              <Grid2 container spacing={4}>
                {events.map((event: any) =>
                  event.categoryId === category.id ? (
                    <Grid2 key={event.id}>
                      <EventCard
                        event={event}
                        onClickSuscribeToEvent={onClickSuscribeToEvent}
                        subscriptions={subscriptions}
                      />
                    </Grid2>
                  ) : (
                    <Fragment key={`empty-${category.id}-${event.id}`} />
                  )
                )}
              </Grid2>
            </Grid2>
          ))}
        </Grid2>
        {openDialog ? (
          <Dialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            aria-labelledby="create-event-dialog"
            fullWidth
            sx={{ padding: "3rem" }}
          >
            <DialogTitle>Create event</DialogTitle>
            <IconButton
              aria-label="close"
              onClick={onClickCloseDialog}
              sx={theme => ({
                position: "absolute",
                right: 8,
                top: 8,
                color: theme.palette.grey[500],
              })}
            >
              <CloseIcon />
            </IconButton>
            <DialogContent>
              <Grid2 container direction="column">
                <FormControl sx={{ marginBottom: "1rem" }}>
                  <FormLabel>Name</FormLabel>
                  <TextField
                    id="name"
                    variant="outlined"
                    value={form.name}
                    onChange={handleChangeInputName}
                    size="small"
                    inputProps={{ maxLength: 100 }}
                  />
                </FormControl>
                <FormControl sx={{ marginBottom: "1rem" }}>
                  <FormLabel>Description</FormLabel>
                  <TextField
                    id="name"
                    variant="outlined"
                    value={form.description}
                    onChange={handleChangeInputDescription}
                    size="small"
                    inputProps={{ maxLength: 150 }}
                  />
                </FormControl>
                <FormControl sx={{ marginBottom: "1rem" }}>
                  <FormLabel>Category</FormLabel>
                  <TextField
                    id="name"
                    variant="outlined"
                    value={form.category}
                    onChange={handleChangeInputCategory}
                    size="small"
                    inputProps={{ maxLength: 25 }}
                  />
                </FormControl>
                <FormControl sx={{ marginBottom: "1rem" }}>
                  <FormLabel>Location</FormLabel>
                  <TextField
                    id="name"
                    variant="outlined"
                    value={form.location}
                    onChange={handleChangeInputLocation}
                    size="small"
                    inputProps={{ maxLength: 30 }}
                  />
                </FormControl>
                <FormControl sx={{ marginBottom: "1rem" }}>
                  <FormLabel>Date</FormLabel>
                  <DatePicker
                    value={form.date}
                    onChange={handleChangeInputDate}
                    disablePast
                  />
                </FormControl>
              </Grid2>
            </DialogContent>
            <DialogActions sx={{ justifyContent: "flex-end" }}>
              <Button onClick={onClickCloseDialog} variant="outlined">
                Cancel
              </Button>
              <Button
                onClick={onClickCloseDialog}
                variant="contained"
                disabled={!isAbled}
              >
                OK
              </Button>
            </DialogActions>
          </Dialog>
        ) : null}
      </Grid2>
    </Fragment>
  )
}

export default App
