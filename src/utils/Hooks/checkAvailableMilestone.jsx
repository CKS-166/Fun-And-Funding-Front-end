import projectMilestoneApiInstace from "../ApiInstance/projectMilestoneApiInstance";

export const checkAvailableMilestone = async (projectId, milestoneId) => {
    try {
        const res = await projectMilestoneApiInstace.get(
            `?projectId=${projectId}&milestoneId=${milestoneId}`
        ).then((res) => res)
        .catch((error) => error);
    
        if(res.status == 200){
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