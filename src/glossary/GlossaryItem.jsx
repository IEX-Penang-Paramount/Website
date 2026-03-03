import "./GlossaryItem.css"


function NamePanel({name}){
    return (<div className="nameFrame">
     {name}
    </div>);
}

function ImagePanel({imagePath}){
    //TODO: Make the image panel return the image according to the given path
    return <div></div>
}

function DescriptionPanel({pDescription, sDescription}) {
    return (<div className="despFrame">
        <div className="pDescription">{pDescription}</div>
        <div className="sDescription">{sDescription}</div>
    </div>);
}

function ExamplePanel({example}) {
    return (<div className="exampleFrame">
        {example}
    </div>);
}

/**
 * 
 * @param name name of the word(in any language)
 * @param pDescription The name of the word(in any language)
 * @param sDescription The name of the word(in any language)
 * @param example Any example sentences
 *  
 */
export function GlossaryItem({word}) {
    return (<div className="innerWordFrame">
        <NamePanel name = {word.name}  />
        {word.imagePath == "" ? <div/> : <ImagePanel imagePath={word.imagePath}/>}
        <DescriptionPanel pDescription={word.pDescription} sDescription={word.sDescription}/>
        <ExamplePanel example={word.example}/>
     </div>);

}

