const ConnectionCard = ({connection})=>{

    const {firstName, lastName, gender, skills, about, userPhoto, age} = connection;

    return(
        <div className="w-[34rem] max-w-xl mb-8">
            <div className="flex flex-row shadow bg-base-300 my-5 rounded-lg">
                <div className="p-4">
                    <div className="avatar m-auto">
                        <div className="w-16 rounded-full ">
                        <img src={userPhoto} />
                        </div>
                    </div>

                   
                </div>

                <div className="p-4 flex flex-col flex-wrap">
                    
                    <div className="stat-value text-xl text-secondary">{firstName + " " + lastName}</div>
                    {age && gender && <div className="stat-desc text-sm">{age + ", "+gender}</div>}

                    <div className="text-sm flex-1 break-words line-clamp-2">{about}</div>
                </div>

                {/* <div className="stat">
                   
                    <div className="stat-value">86%</div>
                    <div className="stat-title">Tasks done</div>
                  
                </div> */}
            </div>
        </div>
    )
}
export default ConnectionCard;