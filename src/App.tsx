import { useEffect, useState } from "react";
import { fetchArtworks } from "./api/artworks";
import type { Artwork } from "./types/artwork";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { OverlayPanel } from "primereact/overlaypanel";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useRef } from "react";

function App() {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(12);
    const [totalRecords, setTotalRecords] = useState(0);

    const [artworks, setArtworks] = useState<Artwork[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
    const overlayRef = useRef<OverlayPanel>(null);
    const [customSelectCount, setCustomSelectCount] = useState("");

    useEffect(() => {
        async function loadArtworks() {
            try {
                setLoading(true);
                const response = await fetchArtworks(currentPage, rowsPerPage);
                setArtworks(response.data);
                setTotalRecords(response.pagination.total);
            } catch {
                setError("Failed to load artworks");
            } finally {
                setLoading(false);
            }
        }

        loadArtworks();
    }, [currentPage, rowsPerPage]);

    if (loading) {
        return <div className="p-4">Loading...</div>;
    }

    if (error) {
        return <div className="p-4 text-red-500">{error}</div>;
    }

    const selectedArtworks = artworks.filter((artwork) =>
        selectedIds.has(artwork.id),
    );

    return (
        <div className="p-4">
            <h1>Artworks Table</h1>

            <div className="mb-3">
                <Button
                    label="Custom Select"
                    icon="pi pi-check-square"
                    onClick={(e) => overlayRef.current?.toggle(e)}
                />
            </div>

            <OverlayPanel ref={overlayRef}>
                <div className="flex flex-column gap-2">
                    <label htmlFor="count">Select rows from this page</label>

                    <InputText
                        id="count"
                        value={customSelectCount}
                        onChange={(e) => setCustomSelectCount(e.target.value)}
                        placeholder="Enter number"
                    />

                    <Button
                        label="Apply"
                        onClick={() => {
                            const count = parseInt(customSelectCount, 10);

                            if (isNaN(count) || count <= 0) {
                                return;
                            }

                            const nextSelected = new Set(selectedIds);

                            artworks.slice(0, count).forEach((artwork) => {
                                nextSelected.add(artwork.id);
                            });

                            setSelectedIds(nextSelected);
                            setCustomSelectCount("");
                            overlayRef.current?.hide();
                        }}
                    />
                </div>
            </OverlayPanel>

            <DataTable
                value={artworks}
                dataKey="id"
                selection={selectedArtworks}
                onSelectionChange={(event) => {
                    const nextSelected = new Set(selectedIds);

                    event.value.forEach((row: Artwork) => {
                        nextSelected.add(row.id);
                    });

                    const selectedIdsOnPage = new Set(
                        event.value.map((row: Artwork) => row.id),
                    );

                    artworks.forEach((artwork) => {
                        if (
                            selectedIds.has(artwork.id) &&
                            !selectedIdsOnPage.has(artwork.id)
                        ) {
                            nextSelected.delete(artwork.id);
                        }
                    });

                    setSelectedIds(nextSelected);
                }}
                selectionMode="checkbox"
                loading={loading}
                paginator
                rows={rowsPerPage}
                totalRecords={totalRecords}
                first={(currentPage - 1) * rowsPerPage}
                onPage={(event) => {
                    const page = event.page ?? 0;
                    const rows = event.rows ?? rowsPerPage;
                    setCurrentPage(page + 1);
                    setRowsPerPage(rows);
                }}
                lazy
            >
                <Column
                    selectionMode="multiple"
                    headerStyle={{ width: "3rem" }}
                />
                <Column field="title" header="Title" />
                <Column field="place_of_origin" header="Place of Origin" />
                <Column field="artist_display" header="Artist" />
                <Column field="inscriptions" header="Inscriptions" />
                <Column field="date_start" header="Start Date" />
                <Column field="date_end" header="End Date" />
            </DataTable>
        </div>
    );
}

export default App;
