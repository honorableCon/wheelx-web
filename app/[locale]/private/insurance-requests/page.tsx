"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    fetchInsuranceRequests,
    markInsuranceRequestAsProcessing,
    approveInsuranceRequest,
    rejectInsuranceRequest,
    activateInsurance,
} from "../lib/api";
import { useToast } from "../providers";
import { format } from "date-fns";

type InsuranceRequest = {
    _id: string;
    userId: { username: string; email: string };
    motorcycleId: { brand: string; model: string; year: number };
    status: string;
    requestedAt: string;
    requestData: {
        coverageType: string;
        startDate: string;
        duration: number;
    };
    insuranceData?: {
        provider: string;
        policyNumber: string;
        actualStartDate: string;
        expirationDate: string;
        documents: string[];
    };
    rejectionReason?: string;
};

const STATUS_COLORS: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    processing: "bg-blue-100 text-blue-800 border-blue-200",
    approved: "bg-green-100 text-green-800 border-green-200",
    rejected: "bg-red-100 text-red-800 border-red-200",
    active: "bg-emerald-100 text-emerald-800 border-emerald-200",
};

export default function InsuranceRequestsPage() {
    const [requests, setRequests] = useState<InsuranceRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState("");
    const [totalPages, setTotalPages] = useState(1);
    const [totalRequests, setTotalRequests] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const { showToast } = useToast();

    // Modal states
    const [approveModalOpen, setApproveModalOpen] = useState(false);
    const [rejectModalOpen, setRejectModalOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState<InsuranceRequest | null>(null);

    // Approve form state
    const [approveForm, setApproveForm] = useState({
        provider: "",
        policyNumber: "",
        actualStartDate: "",
        expirationDate: "",
        documents: "",
        adminNotes: "",
    });

    // Reject form state
    const [rejectionReason, setRejectionReason] = useState("");

    useEffect(() => {
        loadData();
    }, [page, statusFilter]);

    const loadData = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetchInsuranceRequests(page, 10, statusFilter);
            const data = Array.isArray(res) ? res : res.data || [];
            const meta = !Array.isArray(res) && res.meta ? res.meta : { totalPages: 1, total: data.length };

            setRequests(data);
            setTotalPages(meta.totalPages || 1);
            setTotalRequests(meta.total || data.length);
        } catch (e) {
            console.error("Failed to load insurance requests", e);
            setRequests([]);
            setError("Unable to load insurance requests. Please retry.");
        }
        setLoading(false);
    };

    const handleMarkAsProcessing = async (request: InsuranceRequest) => {
        if (!confirm(`Mark request #${request._id.slice(-6)} as processing?`)) return;

        const success = await markInsuranceRequestAsProcessing(request._id);
        if (success) {
            showToast({ title: "Request marked as processing", variant: "success" });
            loadData();
        } else {
            showToast({ title: "Failed to update request", variant: "error" });
        }
    };

    const openApproveModal = (request: InsuranceRequest) => {
        setSelectedRequest(request);
        setApproveForm({
            provider: "",
            policyNumber: "",
            actualStartDate: request.requestData.startDate.split('T')[0],
            expirationDate: "",
            documents: "",
            adminNotes: "",
        });
        setApproveModalOpen(true);
    };

    const handleApprove = async () => {
        if (!selectedRequest) return;
        if (!approveForm.provider || !approveForm.policyNumber || !approveForm.actualStartDate || !approveForm.expirationDate) {
            showToast({ title: "Please fill in all required fields", variant: "error" });
            return;
        }

        const documents = approveForm.documents
            ? approveForm.documents.split(',').map(d => d.trim()).filter(Boolean)
            : [];

        const success = await approveInsuranceRequest(selectedRequest._id, {
            provider: approveForm.provider,
            policyNumber: approveForm.policyNumber,
            actualStartDate: approveForm.actualStartDate,
            expirationDate: approveForm.expirationDate,
            documents,
            adminNotes: approveForm.adminNotes || undefined,
        });

        if (success) {
            showToast({ title: "Request approved successfully", variant: "success" });
            setApproveModalOpen(false);
            loadData();
        } else {
            showToast({ title: "Failed to approve request", variant: "error" });
        }
    };

    const openRejectModal = (request: InsuranceRequest) => {
        setSelectedRequest(request);
        setRejectionReason("");
        setRejectModalOpen(true);
    };

    const handleReject = async () => {
        if (!selectedRequest) return;
        if (!rejectionReason || rejectionReason.length < 10) {
            showToast({ title: "Please provide a rejection reason (min 10 characters)", variant: "error" });
            return;
        }

        const success = await rejectInsuranceRequest(selectedRequest._id, rejectionReason);
        if (success) {
            showToast({ title: "Request rejected", variant: "success" });
            setRejectModalOpen(false);
            loadData();
        } else {
            showToast({ title: "Failed to reject request", variant: "error" });
        }
    };

    const handleActivate = async (request: InsuranceRequest) => {
        if (!confirm(`Activate insurance for ${request.motorcycleId.brand} ${request.motorcycleId.model}? This will update the motorcycle record.`)) return;

        const success = await activateInsurance(request._id);
        if (success) {
            showToast({ title: "Insurance activated successfully", variant: "success" });
            loadData();
        } else {
            showToast({ title: "Failed to activate insurance", variant: "error" });
        }
    };

    return (
        <div className="p-8 space-y-8">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Insurance Requests</h1>
                    <p className="text-slate-500">Manage motorcycle insurance requests from users.</p>
                </div>
                <div className="flex gap-4">
                    <select
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value);
                            setPage(1);
                        }}
                        className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                    >
                        <option value="">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                        <option value="active">Active</option>
                    </select>
                </div>
            </header>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                {error && (
                    <div className="bg-red-50 text-red-700 px-4 py-3 border-b border-red-100 text-sm">
                        {error}
                    </div>
                )}

                {loading && requests.length === 0 ? (
                    <div className="py-20 text-center text-slate-400">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
                        <p className="mt-4">Loading requests...</p>
                    </div>
                ) : requests.length === 0 ? (
                    <div className="py-20 text-center text-slate-400">
                        <p className="text-lg">No insurance requests found.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Request ID</TableHead>
                                    <TableHead>User</TableHead>
                                    <TableHead>Motorcycle</TableHead>
                                    <TableHead>Coverage</TableHead>
                                    <TableHead>Duration</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Requested</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {requests.map((request) => (
                                    <TableRow key={request._id}>
                                        <TableCell className="font-mono text-xs">
                                            #{request._id.slice(-6)}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-medium">{request.userId?.username || 'N/A'}</span>
                                                <span className="text-xs text-slate-500">{request.userId?.email || ''}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-medium">
                                                    {request.motorcycleId?.brand} {request.motorcycleId?.model}
                                                </span>
                                                <span className="text-xs text-slate-500">{request.motorcycleId?.year}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="capitalize">
                                                {request.requestData?.coverageType}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{request.requestData?.duration} months</TableCell>
                                        <TableCell>
                                            <Badge className={STATUS_COLORS[request.status] || ""}>
                                                {request.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-sm text-slate-500">
                                            {format(new Date(request.requestedAt), 'MMM dd, yyyy')}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex gap-2 justify-end">
                                                {request.status === 'pending' && (
                                                    <>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => handleMarkAsProcessing(request)}
                                                        >
                                                            Process
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            onClick={() => openApproveModal(request)}
                                                        >
                                                            Approve
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="destructive"
                                                            onClick={() => openRejectModal(request)}
                                                        >
                                                            Reject
                                                        </Button>
                                                    </>
                                                )}
                                                {request.status === 'processing' && (
                                                    <>
                                                        <Button
                                                            size="sm"
                                                            onClick={() => openApproveModal(request)}
                                                        >
                                                            Approve
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="destructive"
                                                            onClick={() => openRejectModal(request)}
                                                        >
                                                            Reject
                                                        </Button>
                                                    </>
                                                )}
                                                {request.status === 'approved' && (
                                                    <Button
                                                        size="sm"
                                                        onClick={() => handleActivate(request)}
                                                        className="bg-green-600 hover:bg-green-700"
                                                    >
                                                        Activate
                                                    </Button>
                                                )}
                                                {request.status === 'rejected' && (
                                                    <span className="text-xs text-red-600">
                                                        {request.rejectionReason}
                                                    </span>
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between px-4 py-4 border-t border-slate-200">
                        <p className="text-sm text-slate-500">
                            Showing page {page} of {totalPages} ({totalRequests} total)
                        </p>
                        <div className="flex gap-2">
                            <Button
                                onClick={() => setPage(Math.max(1, page - 1))}
                                disabled={page === 1}
                                variant="outline"
                                size="sm"
                            >
                                Previous
                            </Button>
                            <Button
                                onClick={() => setPage(Math.min(totalPages, page + 1))}
                                disabled={page === totalPages}
                                variant="outline"
                                size="sm"
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            {/* Approve Modal */}
            <Dialog open={approveModalOpen} onOpenChange={setApproveModalOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Approve Insurance Request</DialogTitle>
                        <DialogDescription>
                            Fill in the insurance policy details to approve this request.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="provider">Insurance Provider *</Label>
                                <Input
                                    id="provider"
                                    placeholder="e.g., AXA, Allianz"
                                    value={approveForm.provider}
                                    onChange={(e) => setApproveForm({ ...approveForm, provider: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="policyNumber">Policy Number *</Label>
                                <Input
                                    id="policyNumber"
                                    placeholder="e.g., POL-2026-123456"
                                    value={approveForm.policyNumber}
                                    onChange={(e) => setApproveForm({ ...approveForm, policyNumber: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="actualStartDate">Start Date *</Label>
                                <Input
                                    id="actualStartDate"
                                    type="date"
                                    value={approveForm.actualStartDate}
                                    onChange={(e) => setApproveForm({ ...approveForm, actualStartDate: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="expirationDate">Expiration Date *</Label>
                                <Input
                                    id="expirationDate"
                                    type="date"
                                    value={approveForm.expirationDate}
                                    onChange={(e) => setApproveForm({ ...approveForm, expirationDate: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="documents">Document URLs (comma-separated)</Label>
                            <Input
                                id="documents"
                                placeholder="https://example.com/policy.pdf, https://example.com/terms.pdf"
                                value={approveForm.documents}
                                onChange={(e) => setApproveForm({ ...approveForm, documents: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="adminNotes">Admin Notes</Label>
                            <Textarea
                                id="adminNotes"
                                placeholder="Optional notes about this approval..."
                                value={approveForm.adminNotes}
                                onChange={(e) => setApproveForm({ ...approveForm, adminNotes: e.target.value })}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setApproveModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleApprove}>
                            Approve Request
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Reject Modal */}
            <Dialog open={rejectModalOpen} onOpenChange={setRejectModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Reject Insurance Request</DialogTitle>
                        <DialogDescription>
                            Provide a reason for rejecting this insurance request.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="rejectionReason">Rejection Reason *</Label>
                            <Textarea
                                id="rejectionReason"
                                placeholder="e.g., Incomplete motorcycle documentation, Invalid registration papers..."
                                value={rejectionReason}
                                onChange={(e) => setRejectionReason(e.target.value)}
                                rows={4}
                            />
                            <p className="text-xs text-slate-500">Minimum 10 characters</p>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setRejectModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleReject}>
                            Reject Request
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
