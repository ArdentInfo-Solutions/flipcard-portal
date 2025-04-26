"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function WebsiteDetailsForm() {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        websiteName: "",
        overview: "",
        coverPhoto: null as File | null,
        logo: null as File | null,
        images: [] as File[],
        about: "",
        updatedOn: new Date().toLocaleString(),
        tags: "",
        events: "",
        whatsNew: "",
        topPages: Array(5).fill({ title: "", description: "" }),
        phone: "",
        email: "",
        privacyPolicy: "",
        address: "",
    });

    const updateField = (name: string, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
            updatedOn: new Date().toLocaleString(),
        }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        updateField(e.target.name, e.target.value);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: "coverPhoto" | "logo") => {
        const file = e.target.files?.[0] || null;
        if (file && file.size < 100 * 1024) {  // Minimum 100KB
            alert("Please upload an image larger than 100KB for better quality.");
            return;
        }

        updateField(field, file);
    };

    const handleMultipleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files ? Array.from(e.target.files).slice(0, 10) : [];
        updateField("images", files);
    };

    const handleTopPageChange = (index: number, field: "title" | "description", value: string) => {
        setFormData((prev) => {
            const updatedPages = prev.topPages.map((page, i) =>
                i === index ? { ...page, [field]: value } : page
            );
            return { ...prev, topPages: updatedPages, updatedOn: new Date().toLocaleString() };
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form Data:", formData);
        localStorage.setItem("previewData", JSON.stringify(formData));
        router.push("/preview");
    };

    return (
        <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle>Website Details</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="websiteName">Website Name (Max 30 characters)</Label>
                            <Input id="websiteName" name="websiteName" maxLength={30} value={formData.websiteName} onChange={handleInputChange} required  />
                        </div>

                        <div>
                            <Label htmlFor="overview">Overview (Max 169 characters)</Label>
                            <Textarea id="overview" name="overview" maxLength={169} value={formData.overview} onChange={handleInputChange} rows={3} />
                        </div>

                        <div>
                            <Label htmlFor="coverPhoto">Cover Photo</Label>
                            <input id="coverPhoto" type="file" accept="image/*" onChange={(e) => handleFileChange(e, "coverPhoto")} />
                        </div>

                        <div>
                            <Label htmlFor="logo">Website Logo</Label>
                            <input id="logo" type="file" accept="image/*" onChange={(e) => handleFileChange(e, "logo")} />
                        </div>

                        <div>
                            <Label htmlFor="images">Website Images (Up to 10)</Label>
                            <input id="images" type="file" multiple accept="image/*" onChange={handleMultipleFileChange} />
                        </div>

                        <div>
                            <Label htmlFor="about">About the Website</Label>
                            <Textarea id="about" name="about" value={formData.about} onChange={handleInputChange} rows={4} />
                        </div>

                        <div>
                            <Label>Updated On</Label>
                            <Input value={formData.updatedOn} readOnly />
                        </div>

                        <div>
                            <Label htmlFor="tags">Tags (Optional)</Label>
                            <Input id="tags" name="tags" value={formData.tags} onChange={handleInputChange} />
                        </div>

                        <div>
                            <Label htmlFor="events">Events and Offers (Optional)</Label>
                            <Textarea id="events" name="events" value={formData.events} onChange={handleInputChange} rows={2} />
                        </div>

                        <div>
                            <Label htmlFor="whatsNew">What’s New?</Label>
                            <Textarea id="whatsNew" name="whatsNew" value={formData.whatsNew} onChange={handleInputChange} rows={2} />
                        </div>

                        <div>
                            <Label>Top Pages (Optional)</Label>
                            {formData.topPages.map((page, index) => (
                                <div key={index} className="space-y-2">
                                    <Input
                                        placeholder={`Title ${index + 1} (Max 36 chars)`}
                                        maxLength={36}
                                        value={page.title}
                                        onChange={(e) => handleTopPageChange(index, "title", e.target.value)}
                                    />
                                    <Textarea
                                        placeholder={`Description ${index + 1} (Max 69 chars)`}
                                        maxLength={69}
                                        value={page.description}
                                        onChange={(e) => handleTopPageChange(index, "description", e.target.value)}
                                        rows={2}
                                    />
                                </div>
                            ))}
                        </div>

                        <div>
                            <Label htmlFor="phone">Website Support</Label>
                            <Input id="phone" name="phone" placeholder="Phone No." value={formData.phone} onChange={handleInputChange} />
                            <Input id="email" name="email" placeholder="Support Email" value={formData.email} onChange={handleInputChange} />
                        </div>

                        <div>
                            <Label htmlFor="privacyPolicy">Privacy Policy URL</Label>
                            <Input id="privacyPolicy" name="privacyPolicy" value={formData.privacyPolicy} onChange={handleInputChange} />
                        </div>

                        <div>
                            <Label htmlFor="address">Address</Label>
                            <Textarea id="address" name="address" value={formData.address} onChange={handleInputChange} rows={3} />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => router.back()}>
                        Cancel
                    </Button>
                    <Button type="submit">Save Website</Button>
                </CardFooter>
            </form>
        </Card>
    );
}
