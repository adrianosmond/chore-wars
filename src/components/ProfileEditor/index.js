import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Avatar from 'avataaars';

import withAuthorization from '../withAuthorization';

import AvatarGrid from '../AvatarGrid';

import './index.css';

const editorOrder = [
  'skinColor',
  'topType',
  'hairColor',
  'hatColor',
  'facialHairType',
  'facialHairColor',
  'accessoriesType',
  'clotheType',
  'clotheColor',
];

const labels = {
  skinColor: 'Skin Colour',
  topType: 'Hair or Headware',
  hairColor: 'Hair Colour',
  hatColor: 'Headware Colour',
  facialHairType: 'Facial Hair Type',
  facialHairColor: 'Facial Hair Colour',
  accessoriesType: 'Glasses',
  clotheType: 'Clothing Type',
  clotheColor: 'Clothing Colour',
};

const isEditable = {
  skinColor: () => true,
  topType: () => true,
  hairColor: options => [
    'NoHair',
    'Eyepatch',
    'Hat',
    'Hijab',
    'Turban',
    'WinterHat1',
    'WinterHat2',
    'WinterHat3',
    'WinterHat4',
    'LongHairFrida',
    'LongHairShavedSides',
  ].indexOf(options.topType) < 0,
  hatColor: options => [
    'Hijab',
    'Turban',
    'WinterHat1',
    'WinterHat2',
    'WinterHat3',
    'WinterHat4',
  ].indexOf(options.topType) >= 0,
  facialHairType: options => options.topType !== 'Hijab',
  facialHairColor: options => isEditable.facialHairType(options) && options.facialHairType !== 'Blank',
  accessoriesType: () => true,
  clotheType: () => true,
  clotheColor: options => !options.clotheType.startsWith('Blazer'),
};

class ProfileEditor extends Component {
  constructor(props) {
    super(props);
    const { avatar, name } = props.points[props.user];
    this.state = {
      name,
      editing: null,
      avatar,
    };
  }

  updateAvatar(property, value) {
    this.setState({
      avatar: {
        ...this.state.avatar,
        [property]: value,
      },
    });
  }

  render() {
    const { avatar, editing } = this.state;
    if (!avatar) return null;
    return (
      <div className="profile-editor">
        <div className="profile-editor__avatar">
          <Avatar { ...avatar } />
        </div>
        <div className="profile-editor__editor">
          { !editing ? Object.keys(avatar)
            .sort((a, b) => editorOrder.indexOf(a) - editorOrder.indexOf(b))
            .map((key) => {
              if (editorOrder.indexOf(key) >= 0 && isEditable[key](avatar)) {
                return <button className="form__button" onClick={() =>
                  this.setState({ editing: key })} key={key}>{labels[key]}</button>;
              }
              return null;
            })
          : <div>
              <button className="form__button form__button--secondary"
                onClick={() => this.setState({ editing: null })}>Back</button>
              <AvatarGrid avatar={avatar} editing={editing}
                updateAvatar={this.updateAvatar.bind(this)} />
            </div>}
          { !editing ? <button className="form__button form__button--secondary">Save</button> : null }
        </div>
      </div>
    );
  }
}

const authCondition = authUser => !!authUser;
const isLoading = state => !state.pointsLoaded;

const mapStateToProps = state => ({
  gameId: state.session.game.gameId,
  points: state.points.present,
  user: state.session.authUser.uid,
});

export default compose(
  withAuthorization(authCondition, isLoading),
  connect(mapStateToProps),
)(ProfileEditor);
