import React, { useState, FormEvent } from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import './styles.css';
import api from '../../services/api';

function TeacherList() {
  const [teachers, setTeachers] = useState([]);

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  async function searchTeachers(e: FormEvent) {
    e.preventDefault();
    console.log({
      subject,
      week_day,
      time
    });

    const res = await api.get('classes', {
      params: {
        week_day,
        subject,
        time
      }
    });

    setTeachers(res.data);
}

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis.">
        <form id="search-teachers" onSubmit={searchTeachers}>
          <Select 
            name="subject" 
            label="Matéria"
            value={subject} 
            onChange={ (e) => { setSubject(e.target.value) } }
            options={[
              { value:'Artes', label: 'Artes' },
              { value:'Biologia', label: 'Biologia' },
              { value:'Matemática', label: 'Matemática' },
              { value:'História', label: 'História' },
              { value:'Química', label: 'Química' },
              { value:'Ciência', label: 'Ciência' },
              { value:'Física', label: 'Física' },
              { value:'Geografia', label: 'Geografia' },
              { value:'Filosofia', label: 'Filosofia' },
              { value:'Sociologia', label: 'Sociologia' },
              { value:'Português', label: 'Português' },
              { value:'Inglês', label: 'Inglês' },
              { value:'Educação Física', label: 'Educação Física' },
            ]}
          />
          <Select 
            name="week-day" 
            label="Dia da semana"
            value={week_day} 
            onChange={ (e) => { setWeekDay(e.target.value) } }
            options={[
              { value:'0', label: 'Domingo' },
              { value:'1', label: 'Segunda-Feira' },
              { value:'2', label: 'Terça-Feira' },
              { value:'3', label: 'Quarta-Feira' },
              { value:'4', label: 'Quinta-Feira' },
              { value:'5', label: 'Sexta-Feira' },
              { value:'6', label: 'Sábado' },
            ]}
          />
          <Input 
            name="time" 
            label="Hora" 
            type="time" 
            value={time} 
            onChange={ (e) => { setTime(e.target.value) } }
          />

          <button type="submit">
            Buscar
          </button>
        </form>
      </PageHeader>

      <main>
        {teachers.map((t: Teacher) => {
          return <TeacherItem key={t.id} teacher={t} />;
        })}
      </main>
    </div>
  );
}

export default TeacherList;