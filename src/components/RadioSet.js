import React from 'react';
import assert from 'assert';
import "./styles/RadioSet.css";

import Playlist from './Playlist';

class RadioSet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      morningTracks: props.tracks.slice(0, props.tracks.length / 2),
      eveningTracks: props.tracks.slice(props.tracks.length / 2, props.tracks.length),
    };
    this.moveToTop = this.moveToTop.bind(this);
    this.switchPlaylists = this.switchPlaylists.bind(this);
    this.toggleFavorite = this.toggleFavorite.bind(this);
  };

  moveToTop(id) {
    var index = this.state.morningTracks.findIndex(t => t.id === id);
    const isMorningTrack = index !== -1;
    if (!isMorningTrack) {
      index = this.state.eveningTracks.findIndex(t => t.id === id);
    }
    assert(index !== -1);
    var tracks = isMorningTrack ? this.state.morningTracks : this.state.eveningTracks;
    var track = tracks[index];
    tracks.splice(index, 1);
    tracks.unshift(track);
    this.setState({
      morningTracks: this.state.morningTracks,
      eveningTracks: this.state.eveningTracks,
    });
  }

  switchPlaylists(id) {
    var index = this.state.morningTracks.findIndex(t => t.id === id);
    const isMorningTrack = index !== -1;
    if (!isMorningTrack) {
      index = this.state.eveningTracks.findIndex(t => t.id === id);
    }
    assert(index !== -1);
    var currentPlaylist = isMorningTrack ? this.state.morningTracks : this.state.eveningTracks;
    var newPlaylist = !isMorningTrack ? this.state.morningTracks : this.state.eveningTracks;
    var track = currentPlaylist[index];
    console.log(track.title, track.favorite)
    newPlaylist.unshift(track);
    currentPlaylist.splice(index, 1);
    this.setState({
      morningTracks: this.state.morningTracks,
      eveningTracks: this.state.eveningTracks,
    });
  }

  toggleFavorite(id) {
    var track = this.state.morningTracks.find(t => t.id === id) ||
      this.state.eveningTracks.find(t => t.id === id);
    assert(track);
    track.favorite = !track.favorite;
    console.log(track.title, track.favorite)
    this.setState({
      morningTracks: this.state.morningTracks,
      eveningTracks: this.state.eveningTracks,
    });
  }

  render() {
    const props = this.props;
    console.log(`Radio set for ${props.tracks.length} tracks`);
    return (
      <div className="radio-set">
        <section className="radio-set--playlist-container">
          <Playlist
            side="Morning"
            tracks={this.state.morningTracks}
            moveToTop={this.moveToTop}
            switchPlaylists={this.switchPlaylists}
            toggleFavorite={this.toggleFavorite}
          />
          <Playlist
            side="Evening"
            tracks={this.state.eveningTracks}
            moveToTop={this.moveToTop}
            switchPlaylists={this.switchPlaylists}
            toggleFavorite={this.toggleFavorite}
          />
        </section>
      </div>
    );
  }
};

export default RadioSet;
