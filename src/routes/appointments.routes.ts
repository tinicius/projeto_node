import { Router } from "express";
import { startOfHour, parseISO } from "date-fns";

import AppointmentRepository from "../repositories/AppointmentsRepository";

const router = Router();
const appointmentRepository = new AppointmentRepository();

router.get("/", (request, response) => {
    const appointments = appointmentRepository.all();
    return response.json(appointments);
});

router.post("/", (request, response) => {
    const { provider, date } = request.body;

    const parsedDate = startOfHour(parseISO(date));

    const findAppointmentsInSameDate = appointmentRepository.findByDate(parsedDate);

    if (findAppointmentsInSameDate) {
        return response
            .status(400)
            .json({ message: "This appointment is already booked" });
    }

    const appointment = appointmentRepository.create({
        provider,
        date: parsedDate,
    })

    return response.json(appointment);
});

export default router;