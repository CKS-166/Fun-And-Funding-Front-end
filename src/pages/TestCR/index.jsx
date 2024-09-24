import React, { useState } from 'react';
import axios from 'axios';
const TestCR = () => {
    const [projectData, setProjectData] = useState({
        name: '',
        description: '',
        introduction: 'a',
        startDate: '12-09-2023',
        endDate: '12-09-2023',
        target: 0,
        balance: 0,
        bankAccount: { BankNumber: '1', BankCode: 'a' },
        packages: [
            { 
                name: '', 
                requiredAmount: 0, 
                rewardItems: [{ name: "string", description: "string", quantity: 0, imageFile: null }] 
            }
        ],
    });

    const [files, setFiles] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProjectData({
            ...projectData,
            [name]: value,
        });
    };

    const handlePackageChange = (e, packageIndex, rewardIndex = null) => {
    const { name, value } = e.target;
    const updatedPackages = [...projectData.packages];

    if (rewardIndex === null) {
        // Handle package field change
        updatedPackages[packageIndex][name] = value;
    } else {
        // Handle reward field change
        updatedPackages[packageIndex].rewardItems[rewardIndex][name] = value;
    }

    setProjectData({ ...projectData, packages: updatedPackages });
};

    const handleRewardFileChange = (e, packageIndex, rewardIndex) => {
        const file = e.target.files[0];
        const updatedPackages = [...projectData.packages];
        updatedPackages[packageIndex].rewardItems[rewardIndex].imageFile = file;
        setProjectData({ ...projectData, packages: updatedPackages });
    };

    const handleFileChange = (e) => {
        setFiles([...e.target.files]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('Name', projectData.name);
        formData.append('Description', projectData.description);
        formData.append('Introduction', projectData.introduction);
        formData.append('StartDate', projectData.startDate);
        formData.append('EndDate', projectData.endDate);
        formData.append('Target', projectData.target);
        formData.append('Balance', projectData.balance);

        // Append Bank Account information
        formData.append('BankAccount.BankNumber', projectData.bankAccount.BankNumber);
        formData.append('BankAccount.BankCode', projectData.bankAccount.BankCode);
        formData.append('Email' , 'john@example.com');
        // Append packages and reward items
        projectData.packages.forEach((packageData, index) => {
            formData.append(`Packages[${index}].Name`, packageData.name);
            formData.append(`Packages[${index}].RequiredAmount`, packageData.requiredAmount);

            packageData.rewardItems.forEach((reward, rewardIndex) => {
                formData.append(`Packages[${index}].RewardItems[${rewardIndex}].Name`, reward.name);
                formData.append(`Packages[${index}].RewardItems[${rewardIndex}].Description`, reward.description);
                formData.append(`Packages[${index}].RewardItems[${rewardIndex}].Quantity`, reward.quantity);
                if (reward.imageFile) {
                    formData.append(`Packages[${index}].RewardItems[${rewardIndex}].ImageFile`, reward.imageFile);
                }
            });
        });

        // Add other files (e.g., Funding Files)
        for (let i = 0; i < files.length; i++) {
            formData.append(`FundingFiles[${i}].Name`, files[i].name);
            formData.append(`FundingFiles[${i}].URL`, files[i]); // The actual file
            formData.append(`FundingFiles[${i}].Filetype`, 0); // Example file type
        }

        try {
            const response = await axios.post('https://localhost:7044/api/FundingProject/project-add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error creating project:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" onChange={handleInputChange} placeholder="Project Name" />
            <input type="text" name="description" onChange={handleInputChange} placeholder="Description" />
            <input type="file" multiple onChange={handleFileChange} />

            {projectData.packages.map((pkg, packageIndex) => (
                <div key={packageIndex}>
                    <h3>Package {packageIndex + 1}</h3>
                    <input
                        type="text"
                        value={pkg.name}
                        onChange={(e) => handlePackageChange(e, packageIndex)}
                        name="name"
                        placeholder="Package Name"
                    />
                    {pkg.rewardItems.map((reward, rewardIndex) => (
                        <div key={rewardIndex}>
                            <h4>Reward {rewardIndex + 1}</h4>
                            <input
                                type="text"
                                value={reward.name}
                                onChange={(e) => handlePackageChange(e, packageIndex, rewardIndex)}
                                name="name"
                                placeholder="Reward Name"
                            />
                            <input
                                type="file"
                                onChange={(e) => handleRewardFileChange(e, packageIndex, rewardIndex)}
                            />
                        </div>
                    ))}
                </div>
            ))}

            <button type="submit">Create Project</button>
        </form>
    );
}

export default TestCR