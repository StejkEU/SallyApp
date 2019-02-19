import React from "react"
import { connect } from 'react-redux'

class Stats extends React.Component {

    getFormattedStatisticsArray (statistics) {
        let parsedArray = {};
        statistics.forEach((child) => {
            const childData     = child.val();
            const name          = child.key;
            parsedArray[ name ] = [];
            for (let record_id in childData) {
                let child = childData[ record_id ];
                parsedArray[ name ].push(child)
            }
        });
        return parsedArray
    }

    static getFormatted (timer) {
        let date = new Date(null);
        date.setSeconds(timer);
        return date.toISOString().substr(11, 8).split(':');
    }

    render () {
        const {statistics} = this.props;
        let stats          = this.getFormattedStatisticsArray(statistics);

        let scoresByPerson = {};

        //Build unique dates
        let uniqueDates = [];
        Object.keys(stats).map((name) => {

            scoresByPerson[ name ] = [];

            stats[ name ].map((data) => {
                if (uniqueDates.indexOf(data.date) === -1) {
                    uniqueDates.push(data.date)
                }

                scoresByPerson[ name ].push(data.seconds)

            })


        });

        uniqueDates.sort((a, b) => {
            if (a > b) return -1;
            if (a < b) return 1;
            return 0;
            //return new Date(b).getTime() - new Date(a).getTime()
        });

        let parsedTableArray   = {};
        let highestScoreByDate = {};
        uniqueDates.map((date) => {
            parsedTableArray[ date ]   = [];
            highestScoreByDate[ date ] = 0;
            Object.keys(stats).map((name) => {
                let scores = stats[ name ];

                parsedTableArray[ date ][ name ] = [];

                scores.filter((data) => {
                    if (data.date === date) {
                        return true
                    }
                }).map((data) => {
                    console.log(name, data);
                    parsedTableArray[ date ][ name ].push(data.seconds);

                    if (data.seconds > highestScoreByDate[ date ]) {
                        highestScoreByDate[ date ] = data.seconds
                    }
                })

            })
        });

        //console.log(parsedTableArray, scoresByPerson, stats)
        return (
            <div>
                <table className="statistics">
                    <thead>
                    <tr>
                        <th/>
                        {
                            Object.keys(stats).map((name, key) => {
                                return <th key={key}>{name}</th>
                            })
                        }
                    </tr>

                    <tr>
                        <td>Record</td>
                        {
                            Object.keys(scoresByPerson).map((name, key) => {
                                let seconds = Stats.getFormatted(Math.max(...scoresByPerson[ name ]));
                                return <td key={key}><span
                                    className="personal-record">{`${seconds[ 1 ]}:${seconds[ 2 ]}`}</span></td>
                            })
                        }
                    </tr>

                    </thead>
                    <tbody>
                    {
                        uniqueDates.map((date, key) => {
                            return (
                                <tr key={key}>
                                    <td>{date}</td>
                                    {
                                        Object.keys(stats).map((name, key) => {
                                            return (
                                                <table>
                                                    {
                                                        Object.keys(parsedTableArray[ date ][ name ]).map((nameUser, keyUser) => {
                                                            let seconds = parsedTableArray[ date ][ name ][ nameUser ];

                                                            //console.log(stats, parsedTableArray[ date ][ name ])
                                                            if (typeof seconds === 'undefined' || parseInt(seconds) === 0 || seconds === '') {
                                                                return (
                                                                    <tr>
                                                                        <td key={key}>--</td>
                                                                    </tr>
                                                                )
                                                            } else {
                                                                let score = Stats.getFormatted(seconds);
                                                                return (
                                                                    <tr data-date={date}>
                                                                        <td key={key}
                                                                            className={highestScoreByDate[ date ] === seconds ? 'daily-winner' : ''}
                                                                            data-name-user={name}
                                                                            data-name-map={nameUser}
                                                                            data-key-map={keyUser}>
                                                                            <span>{score[ 1 ]}</span>
                                                                            <span>{score[ 2 ]}</span>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            }
                                                        })
                                                    }
                                                </table>
                                            );
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default connect(state => ({
    statistics: state.sally.statistics
}))(Stats)