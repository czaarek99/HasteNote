import React, {Component} from 'react';
import "../styles/loadingGrid.scss"

class LoadingGrid extends Component {
    render() {
        const cubes = [];
        for(let i = 1; i < 10; i++) {
            cubes.push(<div className={"loadingCube loadingCube" + i}/>)
        }
        
        return (
            <div class="loadingCubeGrid">
                {cubes}
            </div>
        );
    }
}

export default LoadingGrid;