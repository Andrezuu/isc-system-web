import { ReactNode } from "react";
import { Container, Grid, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { FullEvent } from "../../models/eventInterface";
import { InternsInformation } from "../../models/internsInterface";
import { internRegisterStates } from "../../constants/internRegisterStates";
import dayjs from "dayjs";

interface TablePageProps {
  event: FullEvent;
  children: ReactNode;
}

const TablePage: React.FC<TablePageProps> = ({ event, children }) => {
  const { PENDING } = internRegisterStates;
  return event ? (
    <Container fixed>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography
            variant="h4"
            component="h1"
            color="primary"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <PersonIcon color="primary" />
            {event.title}
          </Typography>
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            <Grid item xs={6}>
              <Typography variant="body1" color="textSecondary">
                <strong>Fecha Inicial:</strong>{" "}
                {dayjs(event.start_date).format("DD/MM/YYYY")}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                <strong>Fecha Final:</strong>{" "}
                {dayjs(event.end_date).format("DD/MM/YYYY")}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                <strong>Encargado:</strong> {event.responsible_intern_id}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                <strong>Ubicación:</strong> {event.location}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                <strong>Máximo Becarios:</strong> {event.max_interns}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" color="textSecondary">
                <strong>Periodo de Inscripciones:</strong>{" "}
                {dayjs(event.start_cancellation_date).format("DD/MM/YYYY")} -{" "}
                {dayjs(event.end_cancellation_date).format("DD/MM/YYYY")}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                <strong>Horas Becarias:</strong> {event.assigned_hours} horas
              </Typography>
              <Typography variant="body1" color="textSecondary">
                <strong>Duración:</strong> {event.duration_hours} horas
              </Typography>
              <Typography variant="body1" color="textSecondary">
                <strong>
                  Solicitudes de Becarios:{" "}
                  {event.interns.reduce((acc: number, intern) => {
                    if (intern.type == PENDING) {
                      return acc + 1;
                    } else {
                      return acc;
                    }
                  }, 0)}
                </strong>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {children}
        </Grid>
      </Grid>
    </Container>
  ) : (
    <Typography variant="h6" align="center">
      Cargando detalles del evento...
    </Typography>
  );
};

export default TablePage;
