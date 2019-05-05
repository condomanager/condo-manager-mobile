import React, { Component }                 from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';

import ScreenContainer   from 'components/ScreenContainer';
import MainHeader        from 'components/MainHeader';
import { PrimaryButton } from 'components/Button';

import VisitService        from 'services/VisitService';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import Dates  from 'utils/Dates';
import Colors from 'utils/Colors';

export default class MyVisits extends React.Component {
  constructor(props){
    super(props);

    this.state ={ 
      loading:    true,
      visits:     [],
      refreshing: false,
    };
  };

  componentDidMount() {
    VisitService.getInstance().list()
    .then(visits => {
      this.setState({
        loading:    false,
        visits:     visits,
      });
    })
    .catch((error) =>{
      console.error('ERROR:', error);
    });
  };

  refresh = () => {
    this.setState({ refreshing: true });
    VisitService.getInstance().list()
    .then(visits => {
      this.setState({
        refreshing: false,
        visits:     visits,
      });
    })
    .catch((error) =>{
      console.error('ERROR:', error);
    });
  };

  render() {
    const { loading, visits, refreshing } = this.state;
    const { navigation }                  = this.props;

    return (
      <ScreenContainer loading={loading} stickyHeaderIndices={[0]} scrollable={false}>
        <MainHeader navigation={navigation} title="Minhas visitas" />

        <View style={styles.container}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={visits.sort((visit1, visit2) => visit2.createDate - visit1.createDate)}
            keyExtractor={visit => '' + visit.id}
            renderItem={this.renderVisit}
            onRefresh={this.refresh}
            refreshing={refreshing}
          />
        </View>
      </ScreenContainer> 
    );
  };

  renderVisit = ({item}) => {
    const icon = item.authorizeDate ? 'check-circle' : item.denyDate ? 'times-circle' : 'hourglass-half';
    const action = item.authorizeDate ? 'Autorizado': item.denyDate ? 'Negado' : 'Aguardando ação';
    const dateString = Dates.getDateString(item.createDate);
    const timeString = Dates.getTimeString(item.createDate);
    return (
      <View style={styles.listItem}>
        <View style={styles.visitInfo}>
          <Text style={styles.visitor}>{item.visitor.name}</Text>
          <View style={styles.authorContainer}>
            <FontAwesomeIcon icon={icon} color={styles.author.color} size={styles.author.fontSize} />
            <Text style={styles.author}>{action} por {item.author.name}</Text>
          </View>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>{dateString}</Text>
          <Text style={styles.time}>{timeString}</Text>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },

  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    borderColor: Colors.LIGHT_TEXT,
    borderBottomWidth: 1,
  },

  visitInfo: {
    flex: 1,
  },

  visitor: {
    fontSize: 16,
    color: Colors.DEFAULT_TEXT,
  },

  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  author: {
    fontSize: 12,
    color: Colors.LIGHT_TEXT,
    marginLeft: 4
  },

  dateContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },

  date: {
    fontSize: 14,
    color: Colors.DEFAULT_TEXT,
  },

  time: {
    fontSize: 14,
    color: Colors.LIGHT_TEXT,
  },

});