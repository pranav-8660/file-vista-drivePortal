import React from 'react';
import './MainPageFileserv.css';

import FilesFolderImage from './folder-images/folder.png';
import ImagesFolderImage from './folder-images/gallery.png';
import AudioFolderImage from './folder-images/music.png';
import VideoFolderImage from './folder-images/folder (1).png';
import ScratchFolderImage from './folder-images/dustbin.png';



class FolderPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      folders: [
        { name: 'Files', id: 1, image: FilesFolderImage },
        { name: 'Images', id: 2, image: ImagesFolderImage },
        { name: 'Audios', id: 3, image: AudioFolderImage },
        { name: 'Videos', id: 4, image: VideoFolderImage },
        { name: 'Scratchs', id: 5, image: ScratchFolderImage }
      ]
    };
  }

  render() {
    return (
      <div>
        <center><h1>Folders</h1></center>
        <ul>
          {this.state.folders.map(folder => (
            <li key={folder.id}>
              <img src={folder.image} alt={folder.name} />
              <a href={`/${folder.name.toLowerCase()}`}>{folder.name}</a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default FolderPage;
