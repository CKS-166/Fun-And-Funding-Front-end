import projectMilestoneApiInstace from "../ApiInstance/projectMilestoneApiInstance";

const pending = 0
const processing = 1
const completed = 2
const warning = 3
const failed = 4
const submitted = 5
export const checkAvailableMilestone = async (projectId, milestoneId) => {
    try {
        const res = await projectMilestoneApiInstace.get(
            `?projectId=${projectId}&milestoneId=${milestoneId}`
        ).then((res) => res)
        .catch((error) => error);
        console.log(res);
        if(res.status == 200){
            if(res.data._data.items.length == 0){
                return {
                    status : 'not requested',
                    data: [],    
                };
            }
            const status = res.data._data.items[0].status
            console.log(status)
            if(status == processing || status == warning) {
                if(res.data._data.items[0].projectMilestoneRequirements.length > 0
                ){
                    return {
                        status : 'edit',
                        data: res.data._data.items,
                    };
                }else{
                    return {
                        status : 'create',
                        data: res.data._data.items,
                    };
                }
            }else if(status == pending){
                return {
                    status : 'pending',
                    data: [],
                };
            }else if(status == completed){
                return {
                    status : 'completed',
                    data: res.data._data.items,    
                };
            }else if(status == failed){
                return {
                    status : 'failed',
                    data: res.data._data.items,    
                };
            }else if(status == submitted){
                return {
                    status : 'submitted',
                    data: res.data._data.items,    
                };
            }
        }else{
            return {
                status : 'error',
                data: [],
            };
        }
        // Return the resolved data
    } catch (error) {
        console.error(error); // Use console.error for better logging
        throw error; // Rethrow if you want to handle it in the caller
    }
};