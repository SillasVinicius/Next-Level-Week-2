import React, { useState } from 'react'
import { View, ScrollView, Text, TextInput, AsyncStorage } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import TeacherItem, { Teacher } from '../../components/TeacherItem';
import PageHeader from '../../components/PageHeader';

import api from '../../services/api';

import styles from './styles';
import { useFocusEffect } from '@react-navigation/native';

function TeacherList() {

    const [teachers, setTeachers] = useState([]);
    const [isFiltersVisible, setIsFiltersVisible] = useState(false);

    const [favorites, setFavorites] = useState<number[]>([]);
    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            if (response) {
              const favoritedTeachers = JSON.parse(response);
              const favoritedTeachersIds = favoritedTeachers.map(
                (teacher: Teacher) => {
                    return teacher.id;
                }
              );
      
              setFavorites(favoritedTeachersIds);
            }
        });
    }

    useFocusEffect(
        React.useCallback(() => {
          loadFavorites();
        }, [])
    );

    async function handleFiltersSubmit() {
        loadFavorites();
        const res = await api.get('classes', {
            params: {
            subject,
            week_day,
            time,
            }
        });
        setIsFiltersVisible(false);
        setTeachers(res.data);
    }

    function handleToggleFiltersVisible(){
        setIsFiltersVisible(!isFiltersVisible);
    }

    return (
        <View style={styles.container}>
            <PageHeader 
                title='Proffys disponíveis' 
                headerRight={(
                    <BorderlessButton 
                        onPress={handleToggleFiltersVisible}
                    >
                        <Feather 
                            name="filter" 
                            size={20}
                            color="#fff"
                        />
                    </BorderlessButton>
                )}
            >
                { isFiltersVisible && (
                    <View style={styles.searchForm}>
                        <Text style={styles.label}>Matéria</Text>
                        <TextInput 
                            style={styles.input}
                            value={subject}
                            onChangeText={t => setSubject(t)}
                            placeholderTextColor="#c1bccc"
                            placeholder="Qual a matéria?"
                        />
                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da semana</Text>
                                <TextInput 
                                    style={styles.input}
                                    value={week_day}
                                    onChangeText={t => setWeekDay(t)}
                                    placeholderTextColor="#c1bccc"
                                    placeholder="Qual o Dia?"
                                />
                            </View>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>
                                <TextInput 
                                    style={styles.input}
                                    value={time}
                                    onChangeText={t => setTime(t)}
                                    placeholderTextColor="#c1bccc"
                                    placeholder="Qual horário?"
                                />
                            </View>
                        </View>
                        <RectButton 
                            onPress={handleFiltersSubmit} 
                            style={styles.submitButton}
                        >
                            <Text style={styles.submitButtonText}>
                                Filtrar
                            </Text>
                        </RectButton>
                    </View>
                )}
            </PageHeader>

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >
                {teachers.map(
                    (teacher: Teacher) => {
                        return <TeacherItem 
                            key={teacher.id} 
                            teacher={teacher}
                            favorited={favorites.includes(teacher.id)}
                        />
                    }         
                )}
            </ScrollView>   
        </View>
    );
}

export default TeacherList;
