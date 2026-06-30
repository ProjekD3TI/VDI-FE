import CardHalfDoughnutChart from "@/components/CardHalfDoughnutChart";
import { ChartArea } from "@/components/ChartArea";
import DoghnutChart from "@/components/DoghnutChart";
import DetailVmSkeleton from "@/components/skeleteton/DetailVmSkeleton";
import { Card } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";
import { useGetDetailMonitor, useMonitor } from "@/hooks/useMonitor";
import { formatUptime } from "@/utils/formaterDate";
import {
  CpuIcon,
  HardDrive,
  MemoryStick,
  Monitor,
  Server,
  Timer,
  Users,
} from "lucide-react";

export default function ProxmoxDashboard() {
  const { metrics, chartData } = useMonitor();
  const { data, isLoading, isError, error } = useGetDetailMonitor();
  if (isError) {
    console.log(error);
  }
  if (!metrics) {
    return (
      <div className="p-6  min-h-screen w-full">
        <DetailVmSkeleton />
      </div>
    );
  }
  return (
    <>
      {!metrics && isLoading && !isError ? (
        <DetailVmSkeleton />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="px-5 w-full items-center flex flex-row ">
              <Server className="text-primary" />
              <div className="grid">
                <span className="text-sm text-foreground/80">Nodes</span>

                <span>{data?.node}</span>
              </div>
            </Card>
            <Card className="px-5 w-full items-center flex flex-row ">
              <Users className="text-primary" />
              <div className="grid">
                <span className="text-sm text-foreground/80">User</span>
                <span>{data?.userCount}</span>
              </div>
            </Card>
            <Card className="px-5 w-full items-center flex flex-row ">
              <Monitor className="text-primary" />
              <div className="grid">
                <span className="text-sm text-foreground/80">VMs</span>
                <span>{data?.vms} </span>
              </div>
            </Card>
            <Card className="px-5 w-full items-center flex flex-row ">
              <Timer className="text-primary" />
              <div className="grid">
                <span className="text-sm text-foreground/80">Uptime</span>
                <span>
                  {metrics.uptime_seconds === null
                    ? "Not Running"
                    : formatUptime(metrics.uptime_seconds)}
                </span>
              </div>
            </Card>
            <CardHalfDoughnutChart
              Icon={CpuIcon}
              percentage={metrics.cpu.usage_percentage}
              text="vCPU Cores"
              tittle="CPU Usage"
              total={metrics.cpu.cores}
            />
            <Card className="w-full px-5 md:col-span-2">
              <div className="flex gap-2">
                <MemoryStick className="text-primary" />
                Memmory Usage
              </div>
              <div className="flex h-full flex-col  items-center justify-between">
                <DoghnutChart
                  free={metrics.memory.available_gb}
                  used={metrics.memory.used_gb}
                />
                <div className="bg-muted w-md p-2 rounded">
                  <div className="flex justify-between">
                    <span>Available</span>
                    <span>{metrics.memory.available_gb} GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Used</span>
                    <span>{metrics.memory.used_gb} GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total</span>
                    <span>{metrics.memory.total_gb} GB</span>
                  </div>
                </div>
              </div>
            </Card>
            <Card className="w-full px-5 md:col-span-2">
              <div className="flex gap-2">
                <HardDrive className="text-primary" />
                Storage
              </div>
              {metrics.storage.map((disk, index) => (
                <Field key={index} className="w-full">
                  <FieldLabel htmlFor="data">
                    <span>{disk.type}</span>
                    <span className="ml-auto">{`${disk.used_gb}/${disk.total_gb}`}</span>
                  </FieldLabel>
                  <Progress
                    value={disk.used_gb}
                    max={disk.total_gb}
                    id="data"
                  />
                </Field>
              ))}
            </Card>
            <Card className="w-full px-5 md:col-span-2">
              <ChartArea
                cpu={chartData.cpu}
                labels={chartData.labels}
                memory={chartData.memory}
              />
            </Card>
          </div>
        </>
      )}
    </>
  );
}
