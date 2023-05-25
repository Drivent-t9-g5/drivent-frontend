import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CgEnter } from 'react-icons/cg';
import { VscError, VscPass } from 'react-icons/vsc';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import useEvent from '../../hooks/api/useEvent';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import 'dayjs/locale/pt-br';
import useActivitie from '../../hooks/api/useActivitie';
import useAuditorium from '../../hooks/api/useAuditorium';
import usePostSubscription from '../../hooks/api/usePostSubscription';
import { toast } from 'react-toastify';
import useSubscription from '../../hooks/api/useSubscription';

export default function ActivitiesComponent() {
  const [selectedDay, setSelectedDay] = useState('');
  const [showActivities, setShowActivities] = useState(false);
  const [activeEvent, setActiveEvent] = useState(undefined);
  const [auditoriuns, setAuditoriuns] = useState(undefined);
  const [activities, setActivities] = useState(undefined);
  const [position, setPosition] = useState(undefined);
  const [subscriptions, setSubscriptions] = useState(undefined);
  const { event } = useEvent();
  const { getActivitie } = useActivitie();
  const { auditoriumData } = useAuditorium();
  const { getSubscriptions } = useSubscription();
  const { postSubscriptionAct } = usePostSubscription();
  dayjs.extend(isSameOrBefore);

  useEffect(() => {
    if (event) {
      setActiveEvent(event);
      setAuditoriuns(auditoriumData);
    }
  }, [event, auditoriumData]);
  console.log(activeEvent);
  console.log(auditoriuns);

  const { startsAt, endsAt } = activeEvent || {};

  const { days, dates } = generateDaysArray(startsAt, endsAt);

  function generateDaysArray(startsAt, endsAt) {
    console.log(startsAt);
    const days = [];
    const dates = [];
    let currentDate = dayjs(startsAt).locale('pt-br');

    while (currentDate.isSameOrBefore(endsAt, 'day')) {
      currentDate = currentDate.add(1, 'day');
      days.push(currentDate.format('dddd, DD/MM'));
      dates.push(`${currentDate.format('YYYY-MM-DD')}T00:00:00.000Z`);
    }

    return { days, dates };
  }

  async function handleSelectedDay(day, pos) {
    setSelectedDay(day);
    setShowActivities(true);
    const subscriptionsList = await getSubscriptions();
    setSubscriptions(subscriptionsList);
    setPosition(pos);
    const activitie = await getActivitie(event.id, dates[pos]);
    console.log(activitie);
    setActivities(activitie);
  }

  async function handleSuperscription(activitieId, capacity) {
    const newCapacity = capacity - 1;
    try {
      await postSubscriptionAct({ activitieId, newCapacity });
      toast('Inscrito com sucesso!');
      const activitie = await getActivitie(event.id, dates[position]);
      setActivities(activitie);
      const subscriptionsList = await getSubscriptions();
      setSubscriptions(subscriptionsList);
    } catch (error) {
      if (error.message === 'Request failed with status code 409') {
        toast('Você já está inscrito em uma atividade nesse horário');
      } else {
        toast('Não foi possível se inscrever nesta atividade!');
      }
    }
  }

  return (
    <Test>
      <Text>Primeiro, filtre pelo dia do evento: </Text>
      <div>
        {days.map((day) => (
          <EachDay key={day} selected={selectedDay === day} onClick={() => handleSelectedDay(day, days.indexOf(day))}>
            {day}
          </EachDay>
        ))}
      </div>
      <ActivitiesContainer show={showActivities}>
        {auditoriuns?.map((a) => (
          <Auditorium key={a.id}>
            <AuditoriumName>{a.name}</AuditoriumName>
            <div>
              {activities
                ?.filter((activitie) => activitie.auditoriumId === a.id)
                .map((activitie) => (
                  <Activities
                    backgroundcolor={
                      subscriptions.some((subs) => subs.activitieId === activitie.id) ? '#D0FFDB' : '#F1F1F1'
                    }
                    key={activitie.id}
                    height={dayjs(activitie.endTime).diff(dayjs(activitie.startTime), 'hours')}
                  >
                    <div>
                      <p>
                        <span>{activitie.name}</span>
                      </p>
                      <p>
                        {dayjs(activitie.startTime).add(3, 'hour').format('HH:mm')} -{' '}
                        {dayjs(activitie.endTime).add(3, 'hour').format('HH:mm')}
                      </p>
                    </div>
                    <Line></Line>
                    {subscriptions.some((subs) => subs.activitieId === activitie.id) ? (
                      <CapacitySubscribe backgroundcolor="#D0FFDB" color="#078632" name="inscrito">
                        <AiOutlineCheckCircle className="icon" />
                        <p>Inscrito</p>
                      </CapacitySubscribe>
                    ) : activitie.capacity !== 0 ? (
                      <CapacitySubscribe color="#078632" name="enter">
                        <CgEnter
                          className="icon"
                          onClick={() => handleSuperscription(activitie.id, activitie.capacity)}
                        />
                        <p>{activitie.capacity} vagas</p>
                      </CapacitySubscribe>
                    ) : (
                      <CapacitySubscribe color="#CC6666" name="error">
                        <VscError className="icon" />
                        <p>Esgotado</p>
                      </CapacitySubscribe>
                    )}
                  </Activities>
                ))}
            </div>
          </Auditorium>
        ))}
      </ActivitiesContainer>
    </Test>
  );
}

const Test = styled.div`
  height: 70%;
`;

const Text = styled.p`
  font-family: 'Roboto', sans-serif;
  margin-top: 37px;
  margin-bottom: 23px;
  color: #8e8e8e;
  font-size: 20px;
  span {
    font-weight: bold;
  }
`;

const EachDay = styled.button`
  width: 137px;
  height: 37px;
  margin-right: 17px;
  margin-bottom: 10px;
  background-color: ${(props) => (props.selected ? '#FFD37D' : '#E0E0E0')};
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border: 0px;
  border-radius: 4px;
  cursor: pointer;
`;

const ActivitiesContainer = styled.div`
  display: ${(props) => (props.show ? 'flex' : 'none')};
  justify-content: space-between;
  height: 100%;
`;

const Auditorium = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    border: 1px solid #d7d7d7;
    margin-bottom: 10px;
  }
`;

const AuditoriumName = styled.p`
  text-align: center;
  font-family: 'Roboto', sans-serif;
  margin-top: 60px;
  margin-bottom: 13px;
  color: #7b7b7b;
  font-size: 17px;
`;

const Activities = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: ${(props) => props.backgroundcolor};
  border: 0px;
  border-radius: 5px;
  width: 95%;
  height: ${(props) => props.height * 80}px;
  margin-top: 10px;
  div {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    border: 0px;
    width: 75%;
    padding-left: 5px;
  }
  p {
    font-size: 12px;
    color: #343434;
    margin-top: 10px;
    text-align: left;
  }
  span {
    font-weight: 700;
  }
`;

const CapacitySubscribe = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
  font-size: 20px;
  p {
    margin-top: 5px;
    font-size: 9px;
    color: ${(props) => props.color};
    cursor: default;
  }
  .icon {
    color: ${(props) => props.color};
    cursor: ${(props) => (props.name === 'enter' ? 'pointer' : 'default')};
  }
`;

const Line = styled.line`
  height: 75%;
  border-left: 1px solid #cfcfcf;
  color: black;
  margin-left: 10px;
`;
