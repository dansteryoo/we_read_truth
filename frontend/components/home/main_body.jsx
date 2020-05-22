import React from 'react';

const MainBody = ({ mainBodyDevo, fetchESVPassage }) => {

    if (mainBodyDevo === null) return (<div></div>)

    const { img, passages, summary, title } = mainBodyDevo;

    let devoPassages = passages.split(', ');

    let summaryFormat = summary.split('\n').map((item, i) => {
        if (item !== '') {
            if (item.slice(0, 17) !== "Scripture Reading") {
                return <p key={i}><br />{item}</p>
            } 
        }
    });

        return (
            <div className='devo-main-container'>
                <div className='devo-main-title'>
                    <span>{title}</span>
                </div>
                <div className="form-or-separator-mainbody-passages">
                    <hr />
                </div>
                <div className='devo-main-passages'>
                    <span>{devoPassages.map((ele, i) => {
                        return <li key={i}>{ele.trim()}</li>})
                    }</span>
                    <p>{devoPassages.map((ele, i) => {
                        return <li key= {i}>{() => fetchESVPassage(ele.trim())}</li>})
                    }</p>
                </div>
                <div className="form-or-separator-mainbody-summary">
                    <hr />
                </div>
                <div className="devo-main-body">
                    <p>{summaryFormat}</p>
                </div>
                <div className="form-or-separator-mainbody-image">
                    <hr />
                </div>
                <div className='devo-main-image'>
                    <img src={img}/>
                </div>
                <div className='devo-main-footer'>
                    <span>{}</span>
                </div>
            </div>
        )
    };


export default MainBody;