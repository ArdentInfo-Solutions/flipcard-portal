"use client";

import { useState } from 'react';

// Define the expected type for props
interface WebsiteDetailsFormProps {
    onFormSubmit: (newFeed: { name: string; category: string; desc: string; icon: string; url: string }) => void;
    onCancel: () => void;
}

export default function WebsiteDetailsForm({ onFormSubmit, onCancel }: WebsiteDetailsFormProps) {
    const [formData, setFormData] = useState({
        websiteName: '',
        overview: '',
        tags: '',
        logo: null as File | null,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setFormData((prev) => ({ ...prev, logo: file }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newFeed = {
            name: formData.websiteName,
            category: formData.tags,
            desc: formData.overview,
            icon: formData.logo ? URL.createObjectURL(formData.logo) : '/images/placeholder.jpg',
            url: '#',
        };

        onFormSubmit(newFeed);
        setFormData({ websiteName: '', overview: '', tags: '', logo: null });
    };
    const handleCancel = () => {
        setFormData({ websiteName: '', overview: '', tags: '', logo: null }); // Reset form
        onCancel(); // Call the onCancel function
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block font-medium text-black">Website Name</label>
                <input type="text" name="websiteName" maxLength={30} value={formData.websiteName}
                    onChange={handleInputChange} className="w-full p-2 border rounded text-green" required />
            </div>

            <div>
                <label className="block font-medium text-black">Overview</label>
                <textarea name="overview" maxLength={169} value={formData.overview}
                    onChange={handleInputChange} className="w-full p-2 border rounded text-black"></textarea>
            </div>
            <div>
                <label className="block font-medium text-black">Website Logo</label>
                <input type="file" accept="image/*" onChange={handleFileChange} />
            </div>
            <div>
                <label className="block font-medium text-black">Tags (Category)</label>
                <input type="text" name="tags" value={formData.tags} onChange={handleInputChange} className="w-full p-2 border rounded text-black" />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">Create Feed</button>
            <button type="button" onClick={handleCancel} className="w-full bg-gray-500 text-white py-2 rounded-md">Cancel</button>
        </form>
    );
}



// 'use client';

// import { useState } from 'react';
// import Image from 'next/image';

// export default function WebsiteDetailsForm() {
//     const [formData, setFormData] = useState({
//         websiteName: '',
//         overview: '',
//         about: '',
//         phone: '',
//         email: '',
//         privacyPolicy: '',
//         address: '',
//         tags: '',
//         events: '',
//         whatsNew: '',
//         topPages: Array(5).fill({ title: '', description: '' }),
//         coverPhoto: null,
//         logo: null,
//         images: [] as File[],
//     });

//     const [feeds, setFeeds] = useState<any[]>([]);

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index?: number) => {
//         const { name, value } = e.target;
//         if (index !== undefined) {
//             const updatedPages = [...formData.topPages];
//             updatedPages[index] = { ...updatedPages[index], [name]: value };
//             setFormData((prev) => ({ ...prev, topPages: updatedPages }));
//         } else {
//             setFormData((prev) => ({ ...prev, [name]: value }));
//         }
//     };

//     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof typeof formData) => {
//         const file = e.target.files ? e.target.files[0] : null;
//         setFormData((prev) => ({ ...prev, [field]: file }));
//     };

//     const handleMultiFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const files = e.target.files ? Array.from(e.target.files) : [];
//         setFormData((prev) => ({ ...prev, images: files }));
//     };

//     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         const newFeed = {
//             name: formData.websiteName,
//             desc: formData.overview,
//             category: formData.tags,
//             icon: formData.logo ? URL.createObjectURL(formData.logo) : '/placeholder.jpg',
//             url: formData.privacyPolicy || '#',
//         };
//         setFeeds((prev) => [...prev, newFeed]);
//         setFormData({
//             websiteName: '',
//             overview: '',
//             about: '',
//             phone: '',
//             email: '',
//             privacyPolicy: '',
//             address: '',
//             tags: '',
//             events: '',
//             whatsNew: '',
//             topPages: Array(5).fill({ title: '', description: '' }),
//             coverPhoto: null,
//             logo: null,
//             images: [],
//         });
//     };

//     return (
//         <div className="max-w-4xl mx-auto p-6 shadow-lg rounded-lg">
//             <h2 className="text-2xl font-bold mb-4">Website Details</h2>
//             <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                     <label className="block font-medium">Website Name</label>
//                     <input type="text" name="websiteName" maxLength={30} value={formData.websiteName}
//                         onChange={handleInputChange} className="w-full p-2 border rounded text-black" required />
//                 </div>
//                 <div>
//                     <label className="block font-medium">Overview</label>
//                     <textarea name="overview" maxLength={169} value={formData.overview}
//                         onChange={handleInputChange} className="w-full p-2 border rounded text-black"></textarea>
//                 </div>
//                 <div>
//                     <label className="block font-medium">Website Logo</label>
//                     <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'logo')} />
//                 </div>
//                 <div>
//                     <label className="block font-medium">Privacy Policy URL</label>
//                     <input type="url" name="privacyPolicy" value={formData.privacyPolicy} onChange={handleInputChange} className="w-full p-2 border rounded text-black" />
//                 </div>
//                 <div>
//                     <label className="block font-medium">Tags</label>
//                     <input type="text" name="tags" value={formData.tags} onChange={handleInputChange} className="w-full p-2 border rounded text-black" />
//                 </div>
//                 <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">Create Feed</button>
//             </form>

//             <h3 className="text-xl font-semibold mt-6">Feeds</h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 w-full max-w-6xl">
//                 {feeds.map((feed, index) => (
//                     <div key={index} className="flex flex-col p-4 shadow rounded-lg bg-white">
//                         <div className="flex items-start gap-3">
//                             <Image src={feed.icon} alt={feed.name} width={50} height={50} className="rounded-lg object-cover" />
//                             <div className="flex flex-col">
//                                 <h2 className="text-lg font-semibold text-gray-500 cursor-pointer hover:underline">
//                                     <a href={feed.url} target='_blank' rel='noopener noreferrer'>{feed.name}</a>
//                                 </h2>
//                                 <p className="text-sm text-gray-500">{feed.category}</p>
//                             </div>
//                         </div>
//                         <p className="text-sm text-black mt-2">{feed.desc}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }
