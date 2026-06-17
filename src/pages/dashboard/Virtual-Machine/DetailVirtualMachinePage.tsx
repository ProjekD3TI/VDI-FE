import LineChart from "@/components/LineChart";
import SemiDoughnatChart from "@/components/SemiDoughnatChart";
import DetailVmSkeleton from "@/components/skeleteton/DetailVmSkeleton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useActionVm, useDetailVm } from "@/hooks/useVirtualDesktops";
import {
  ArrowLeft,
  CpuIcon,
  FingerprintPattern,
  HardDrive,
  LayoutTemplate,
  MemoryStick,
  Network,
  Play,
  ScrollText,
  StopCircleIcon,
  Timer,
} from "lucide-react";
import { Link, useParams } from "react-router";

const DetailVirtualMachinePage = () => {
  const { vmid } = useParams();
  const {
    mutate: handleAction,
    isPending: isActionPending,
    variables,
  } = useActionVm();

  const { data, isLoading } = useDetailVm(Number(vmid));
  return (
    <div className="m-10 w-full space-y-6">
      <div className="flex justify-between items-center">
        <Button variant={"outline"} asChild>
          <Link to={"/dashboard/virtual-desktop"}>
            <ArrowLeft /> Back
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          <Button
            disabled
            variant={data?.status === "running" ? "secondary" : "default"}
          >
            {data?.status}
          </Button>
          <Button
            variant={"outline"}
            disabled={isActionPending && variables?.vmid === data?.vmid}
            onClick={() =>
              handleAction({
                vmid: data?.vmid,
                action: data?.status === "running" ? "stop" : "start",
              })
            }
          >
            {data?.status === "running" ? <StopCircleIcon /> : <Play />}
          </Button>
        </div>
      </div>
      {isLoading ? (
        <DetailVmSkeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="px-5 w-full items-center flex flex-row ">
            <FingerprintPattern className="text-primary" />
            <div className="grid">
              <span className="text-sm text-foreground/80">{data?.name}</span>
              <span>{data?.vmid}</span>
            </div>
          </Card>
          <Card className="px-5 w-full items-center flex flex-row ">
            <Network className="text-primary" />
            <div className="grid">
              <span className="text-sm text-foreground/80">IP Address</span>
              <span>{data?.ip_address}</span>
            </div>
          </Card>
          <Card className="px-5 w-full items-center flex flex-row ">
            <LayoutTemplate className="text-primary" />
            <div className="grid">
              <span className="text-sm text-foreground/80">Template ID</span>
              <span>{data?.template_id}</span>
            </div>
          </Card>
          <Card className="px-5 w-full items-center flex flex-row ">
            <Timer className="text-primary" />
            <div className="grid">
              <span className="text-sm text-foreground/80">Uptime</span>
              <span>
                {data?.uptime === null && data.status === "stopped"
                  ? "Not Running"
                  : data?.uptime}
              </span>
            </div>
          </Card>
          <Card className="w-full px-5 md:col-span-2">
            <div className="flex gap-2">
              <CpuIcon className="text-primary" />
              CPU Usage
            </div>
            <div className="flex justify-center">
              <SemiDoughnatChart
                usedCpu={data?.cpu_usage}
                totalCpu={data?.cpus}
              />
            </div>
          </Card>
          <Card className="w-full px-5 md:col-span-2">
            <div className="flex gap-2">
              <MemoryStick className="text-primary" />
              Memory Usage
            </div>
            <LineChart
              name="Used"
              percent={data?.ram_usage_percent}
              total={data?.ram_total}
              used={data?.ram_used}
            />
            <Card className="bg-muted flex flex-col gap-2 p-4">
              <div className="flex justify-between w-full">
                <span>Available</span>
                <span>{data?.ram_available} GB</span>
              </div>

              <div className="flex justify-between w-full">
                <span>Total</span>
                <span>{data?.ram_total ?? 0} GB</span>
              </div>
            </Card>
          </Card>
          <Card className="w-full px-5 md:col-span-2">
            <div className="flex gap-2">
              <HardDrive className="text-primary" />
              Storage
            </div>
            <LineChart
              name="Used"
              used={data?.storage_used ?? 0}
              percent={data?.storage_usage_percent ?? 0}
              total={data?.storage_total ?? 0}
            />
            <Card className="bg-muted flex flex-col gap-2 p-4">
              <div className="flex justify-between w-full">
                <span>Available</span>
                <span>{data?.storage_available ?? 0} GB</span>
              </div>

              <div className="flex justify-between w-full">
                <span>Total</span>
                <span>{data?.storage_total ?? 0} GB</span>
              </div>
              <div className="flex justify-between w-full">
                <span>Allocated</span>
                <span>{data?.storage_total_allocated ?? 0} GB</span>
              </div>
            </Card>
          </Card>
          <Card className="w-full px-5 md:col-span-2">
            <div className="flex gap-2">
              <ScrollText className="text-primary" />
              Overview
            </div>
            <div className="flex justify-between w-full border-b pb-0.5">
              <span>Hostname</span>
              <span>{data?.name ?? 0}</span>
            </div>
            <div className="flex justify-between w-full border-b pb-0.5">
              <span>Network</span>
              <span>{data?.ip_address ?? 0}</span>
            </div>
            <div className="flex justify-between w-full border-b pb-0.5">
              <span>vCPUs</span>
              <span>{data?.cpus ?? 0} GB</span>
            </div>
            <div className="flex justify-between w-full border-b pb-0.5">
              <span>RAM</span>
              <span>{data?.ram_total ?? 0} GB</span>
            </div>
            <div className="flex justify-between w-full border-b pb-0.5">
              <span>Storage</span>
              <span>{data?.storage_total ?? 0} GB</span>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default DetailVirtualMachinePage;
